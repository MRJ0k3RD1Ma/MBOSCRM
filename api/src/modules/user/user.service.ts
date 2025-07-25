import { Injectable } from '@nestjs/common';
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

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: { name: createUserDto.name },
    });
    if (existingUser) {
      throw HttpError({ code: 'User with this name already exists' });
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;

    const user = await this.prisma.user.create({ data: createUserDto });
    delete user.password;
    return user;
  }

  async login(dto: LoginUserDto) {
    const { name, password } = dto;
    const user = await this.prisma.user.findFirst({
      where: { name: name },
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
          expiresIn: '1d',
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
    const { limit = 10, page = 1, name } = dto;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where: {
          name: {
            contains: name?.trim() || '',
            mode: 'insensitive',
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      this.prisma.user.count({
        where: {
          name: {
            contains: name?.trim() || '',
            mode: 'insensitive',
          },
        },
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
      where: { id },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) {
      throw HttpError({ code: 'User not found' });
    }
    return user;
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw HttpError({ code: 'User not found' });

    const updateData: any = {
      name: dto.name || user.name,
    };

    if (dto.newPassword) {
      if (!dto.oldPassword)
        throw HttpError({ code: 'The previous password is required' });

      const match = await bcrypt.compare(dto.oldPassword, user.password);
      if (!match) throw HttpError({ code: 'Wrong password' });

      updateData.password = await bcrypt.hash(dto.newPassword, 10);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return updatedUser;
  }

  async remove(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });
    if (!user) {
      throw HttpError({ code: 'User not found' });
    }
    return await this.prisma.user.delete({
      where: { id: id },
    });
  }
}
