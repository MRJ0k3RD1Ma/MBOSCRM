import { Injectable, OnModuleInit } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { HttpError } from 'src/common/exception/http.error';
import { FindAllUserQueryDto } from './dto/findAll-user.dto';
import { sign, verify } from 'jsonwebtoken';
import {
  getTokenVersion,
  incrementTokenVersion,
} from 'src/common/auth/token-version.store';
import {
  getRefreshTokenVersion,
  incrementRefreshTokenVersion,
} from 'src/common/auth/refresh-token-version.store';
import { env } from 'src/common/config';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshUserDto } from './dto/refresh-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from 'src/common/auth/roles/role.enum';
import { Prisma, User, UserRole } from '@prisma/client';
import { faker } from '@faker-js/faker';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    if ((await this.prisma.user.count({})) == 0) {
      await this.create({
        name: 'admin',
        password: 'admin',
        username: 'admin',
        roleId: 1,
      });
    }

    if (env.ENV != 'prod') {
      const count = await this.prisma.userRole.count();
      const requiredCount = 1;
      if (count < requiredCount) {
        for (let i = count; i < requiredCount; i++) {
          await this.create({
            name: faker.person.fullName(),
            password: '1234',
            username: faker.person.firstName(),
            roleId: 1,
            phone: faker.phone.number(),
          });
        }
      }
    }
  }
  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: { name: createUserDto.name },
    });
    if (existingUser) {
      throw HttpError({ code: 'User with this name already exists' });
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;

    //let role: UserRole;
    //if (createUserDto.roleId) {
    //  role = await this.prisma.userRole.findUnique({
    //    where: { id: createUserDto.roleId },
    //  });
    //  if (!role) {
    //    throw HttpError({ code: 'Role Not Found' });
    //  }
    //}

    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        //roleId: role.id,
      },
    });
    delete user.password;
    return user;
  }

  async login(dto: LoginUserDto) {
    const { username, password } = dto;
    const user = await this.prisma.user.findFirst({
      where: { username: username, isDeleted: false },
    });
    if (!user) {
      throw HttpError({ code: 'User not found' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw HttpError({ code: 'Invalid credentials' });
    }
    incrementTokenVersion(user.id.toString());
    incrementRefreshTokenVersion(user.id.toString());

    const tokenVersion = getTokenVersion(user.id.toString());
    const refreshTokenVersion = getRefreshTokenVersion(user.id.toString());

    const [accessToken, refreshToken] = [
      sign(
        { id: user.id, role: Role.Admin, tokenVersion },
        env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: '2h',
        },
      ),
      sign(
        { id: user.id, role: Role.Admin, refreshTokenVersion },
        env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: '7d',
        },
      ),
    ];

    delete user.password;
    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async refresh(dto: RefreshUserDto) {
    const token = dto.refreshToken;

    const userData = verify(token, env.REFRESH_TOKEN_SECRET) as {
      id: number;
      refreshTokenVersion: string;
    };

    if (!userData) throw HttpError({ code: 'LOGIN_FAILED' });

    const user = await this.prisma.user.findUnique({
      where: { id: userData.id },
    });

    if (!user) {
      throw HttpError({ code: 'User not found' });
    }

    const currentRefreshVersion = getRefreshTokenVersion(user.id.toString());
    if (userData.refreshTokenVersion !== currentRefreshVersion) {
      throw HttpError({ code: 'TOKEN_INVALIDATED' });
    }

    incrementTokenVersion(user.id.toString());
    const currentTokenVersion = getTokenVersion(user.id.toString());

    const accessToken = sign(
      {
        id: user.id,
        tokenVersion: currentTokenVersion,
        role: Role.Admin,
      },
      env.ACCESS_TOKEN_SECRET,
      { expiresIn: '2h' },
    );

    return { accessToken };
  }

  async logout(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw HttpError({ code: 'User not found' });
    }
    incrementTokenVersion(user.id.toString());
    incrementRefreshTokenVersion(user.id.toString());

    return { message: 'Logged out successfully' };
  }

  async findAll(dto: FindAllUserQueryDto) {
    const { limit = 10, page = 1, name, roleId, username, chatId, phone} = dto;


    const where: Prisma.UserWhereInput = {
      isDeleted: false,
    };

    if (name) {
      where.name = {
        contains: name.trim(),
        mode: 'insensitive',
      };
    }
    if (roleId) {
      where.roleId = roleId;
    }
    if (username) {
      where.username = {
        contains: username.trim(),
        mode: 'insensitive',
      };
    }
    if (chatId) {
      where.chatId = {
        contains: chatId.trim(),
        mode: 'insensitive',
      };
    }
    if (phone) {
      where.phone = {
        contains: phone.trim(),
        mode: 'insensitive',
      };
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        include: { UserRole: true },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({
        where,
      }),
    ]);

    return {
      total,
      page,
      limit,
      data,
    };
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id, isDeleted: false },
      include: { UserRole: true },
    });
    if (!user) {
      throw HttpError({ code: 'User not found' });
    }
    return user;
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id, isDeleted: false },
    });
    if (!user) throw HttpError({ code: 'User not found' });

    const updateData: Partial<User> = {
      name: dto.name || user.name,
      chatId: dto.chatId || user.chatId,
      phone: dto.phone || user.phone,
      roleId: dto.roleId || user.roleId,
      username: dto.username || user.username,
    };

    if (dto.password) {
      updateData.password = await bcrypt.hash(dto.password, 10);
    }

    let role: UserRole;
    if (updateData.roleId) {
      role = await this.prisma.userRole.findUnique({
        where: { id: updateData.roleId },
      });
      if (!role) {
        throw HttpError({ code: 'Role Not Found' });
      }
      updateData.roleId = role.id;
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateData,
    });

    return updatedUser;
  }

  async remove(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: id, isDeleted: false },
    });
    if (!user) {
      throw HttpError({ code: 'User not found' });
    }
    return await this.prisma.user.update({
      where: { id: id },
      data: { isDeleted: true },
    });
  }
}
