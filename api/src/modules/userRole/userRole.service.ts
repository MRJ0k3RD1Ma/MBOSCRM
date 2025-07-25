import { Injectable } from '@nestjs/common';
import { HttpError } from 'src/common/exception/http.error';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { FindAllUserRoleQueryDto } from './dto/findAll-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';

@Injectable()
export class UserRoleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserRoleDto: CreateUserRoleDto) {
    const userRole = await this.prisma.userRole.create({
      data: createUserRoleDto,
    });
    return userRole;
  }

  async findAll(dto: FindAllUserRoleQueryDto) {
    const { limit = 10, page = 1, name } = dto;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.userRole.findMany({
        where: {
          name: {
            contains: name?.trim() || '',
            mode: 'insensitive',
          },
          isDeleted: false,
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.userRole.count({
        where: {
          name: {
            contains: name?.trim() || '',
            mode: 'insensitive',
          },
          isDeleted: false,
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
    const userRole = await this.prisma.userRole.findUnique({
      where: { id, isDeleted: false },
    });
    if (!userRole) {
      throw HttpError({ code: 'UserRole not found' });
    }
    return userRole;
  }

  async update(id: number, dto: UpdateUserRoleDto) {
    const userRole = await this.prisma.userRole.findUnique({
      where: { id, isDeleted: false },
    });
    if (!userRole) throw HttpError({ code: 'UserRole not found' });

    const updateData: any = {
      name: dto.name || userRole.name,
    };

    const updatedUserRole = await this.prisma.userRole.update({
      where: { id },
      data: updateData,
    });

    return updatedUserRole;
  }

  async remove(id: number) {
    const userRole = await this.prisma.userRole.findUnique({
      where: { id: id, isDeleted: false },
    });
    if (!userRole) {
      throw HttpError({ code: 'UserRole not found' });
    }
    return await this.prisma.userRole.update({
      where: { id: id },
      data: { isDeleted: true },
    });
  }
}
