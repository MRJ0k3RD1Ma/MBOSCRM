import { Injectable, OnModuleInit } from '@nestjs/common';
import { HttpError } from 'src/common/exception/http.error';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientTypeDto } from './dto/create-client-type.dto';
import { FindAllClientTypeQueryDto } from './dto/findAll-client-type.dto';
import { UpdateClientTypeDto } from './dto/update-client-type.dto';
import { env } from 'src/common/config';
import { faker } from '@faker-js/faker';

@Injectable()
export class ClientTypeService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    if (env.ENV != 'prod') {
      const count = await this.prisma.clientType.count();
      const requiredCount = 5;
      if (count < requiredCount) {
        for (let i = count; i < requiredCount; i++) {
          await this.create({
            name: faker.person.jobType(),
          });
        }
      }
    }
  }

  async create(createClientTypeDto: CreateClientTypeDto) {
    const clientType = await this.prisma.clientType.create({
      data: { ...createClientTypeDto },
    });
    return clientType;
  }

  async findAll(dto: FindAllClientTypeQueryDto) {
    const { limit = 10, page = 1, name } = dto;
    const [data, total] = await this.prisma.$transaction([
      this.prisma.clientType.findMany({
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
      this.prisma.clientType.count({
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
    const clientType = await this.prisma.clientType.findUnique({
      where: { id, isDeleted: false },
    });
    if (!clientType) {
      throw HttpError({ code: 'ClientType not found' });
    }
    return clientType;
  }

  async update(id: number, dto: UpdateClientTypeDto) {
    const clientType = await this.prisma.clientType.findUnique({
      where: { id, isDeleted: false },
    });
    if (!clientType) throw HttpError({ code: 'ClientType not found' });

    const updateData: any = {
      name: dto.name || clientType.name,
    };

    const updatedClientType = await this.prisma.clientType.update({
      where: { id },
      data: updateData,
    });

    return updatedClientType;
  }

  async remove(id: number) {
    const clientType = await this.prisma.clientType.findUnique({
      where: { id: id, isDeleted: false },
    });
    if (!clientType) {
      throw HttpError({ code: 'ClientType not found' });
    }
    return await this.prisma.clientType.update({
      where: { id: id },
      data: { isDeleted: true },
    });
  }
}
