import { Injectable, OnModuleInit } from '@nestjs/common';
import { HttpError } from '../../common/exception/http.error';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaidOtherGroupDto } from './dto/create-paid-other-group.dto';
import { FindAllPaidOtherGroupQueryDto } from './dto/findAll-paid-other-group.dto';
import { UpdatePaidOtherGroupDto } from './dto/update-paid-other-group.dto';
import { env } from '../../common/config';
import { faker } from '@faker-js/faker';
import { Prisma } from '@prisma/client';

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
    const { limit = 10, page = 1, name, fromDate, toDate } = dto;

    const where: Prisma.PaidOtherGroupWhereInput = {
      isDeleted: false,
      ...(name ? { name: { contains: name.trim(), mode: 'insensitive' } } : {}),
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.paidOtherGroup.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { id: 'desc' },
      }),
      this.prisma.paidOtherGroup.count({ where }),
    ]);

    const totalData = await Promise.all(
      data.map(async (group) => {
        const totalOutcode = await this.prisma.paidOther.aggregate({
          where: {
            group: { id: group.id },
            type: 'OUTCOME',
            isDeleted: false,
            paidDate: { lte: toDate, gte: fromDate },
          },
          _sum: { price: true },
        });
        const totalIncode = await this.prisma.paidOther.aggregate({
          where: {
            group: { id: group.id },
            type: 'INCOME',
            isDeleted: false,
            paidDate: { lte: toDate, gte: fromDate },
          },
          _sum: { price: true },
        });

        return {
          ...group,
          totalIncome: totalIncode._sum.price,
          totalOutcome: totalOutcode._sum.price,
        };
      }),
    );

    return { total, page, limit, totalData };
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
