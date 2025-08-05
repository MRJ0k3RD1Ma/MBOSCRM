import { Injectable, OnModuleInit } from '@nestjs/common';
import { HttpError } from 'src/common/exception/http.error';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaidOtherGroupDto } from './dto/create-paid-other-group.dto';
import { FindAllPaidOtherGroupQueryDto } from './dto/findAll-paid-other-group.dto';
import { UpdatePaidOtherGroupDto } from './dto/update-paid-other-group.dto';
import { env } from 'src/common/config';
import { faker } from '@faker-js/faker';

@Injectable()
export class PaidOtherGroupService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    if (env.ENV != 'prod') {
      const count = await this.prisma.paidOtherGroup.count();
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

  async create(createPaidOtherGroupDto: CreatePaidOtherGroupDto) {
    const paidOtherGroup = await this.prisma.paidOtherGroup.create({
      data: { ...createPaidOtherGroupDto },
    });
    return paidOtherGroup;
  }

  async findAll(dto: FindAllPaidOtherGroupQueryDto) {
    const { limit = 10, page = 1, name } = dto;
    const [data, total] = await this.prisma.$transaction([
      this.prisma.paidOtherGroup.findMany({
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
      this.prisma.paidOtherGroup.count({
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
    const paidOtherGroup = await this.prisma.paidOtherGroup.findUnique({
      where: { id, isDeleted: false },
    });
    if (!paidOtherGroup) {
      throw HttpError({ code: 'PaidOtherGroup not found' });
    }
    return paidOtherGroup;
  }

  async update(id: number, dto: UpdatePaidOtherGroupDto) {
    const paidOtherGroup = await this.prisma.paidOtherGroup.findUnique({
      where: { id, isDeleted: false },
    });
    if (!paidOtherGroup) throw HttpError({ code: 'PaidOtherGroup not found' });

    const updateData: any = {
      name: dto.name || paidOtherGroup.name,
    };

    const updatedPaidOtherGroup = await this.prisma.paidOtherGroup.update({
      where: { id },
      data: updateData,
    });

    return updatedPaidOtherGroup;
  }

  async remove(id: number) {
    const paidOtherGroup = await this.prisma.paidOtherGroup.findUnique({
      where: { id: id, isDeleted: false },
    });
    if (!paidOtherGroup) {
      throw HttpError({ code: 'PaidOtherGroup not found' });
    }
    return await this.prisma.paidOtherGroup.update({
      where: { id: id },
      data: { isDeleted: true },
    });
  }
}
