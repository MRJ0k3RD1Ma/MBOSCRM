import { Injectable } from '@nestjs/common';
import { CreatePaidOtherDto } from './dto/create-paid-other.dto';
import { UpdatePaidOtherDto } from './dto/update-paid-other.dto';
import { PrismaService } from '../prisma/prisma.service';
import { HttpError } from 'src/common/exception/http.error';
import { FindAllQueryPaidOtherDto } from './dto/findAll-query-paid-other.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PaidOtherService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createPaidOtherDto: CreatePaidOtherDto) {
    const { description, groupId, paidDate, price, type } = createPaidOtherDto;

    if (groupId) {
      const group = await this.prisma.paidOtherGroup.findFirst({
        where: { id: groupId, isDeleted: false },
      });
      if (!group) {
        throw new HttpError({
          message: `group with ID ${groupId} not found or deleted`,
        });
      }
    }

    const paidOther = await this.prisma.paidOther.create({
      data: {
        description,
        groupId,
        paidDate,
        price,
        type,
      },
    });

    if (type === 'OUTCOME') {
      await this.prisma.setting.update({
        where: { id: 1 },
        data: { balance: { decrement: price } },
      });
    } else if (type === 'INCOME') {
      await this.prisma.setting.update({
        where: { id: 1 },
        data: { balance: { increment: price } },
      });
    }

    return paidOther;
  }

  async findAll(dto: FindAllQueryPaidOtherDto) {
    const { minPrice, maxPrice, fromDate, toDate, description, groupId, type } =
      dto;

    const where: Prisma.PaidOtherWhereInput = {
      isDeleted: false,
    };

    if (minPrice || maxPrice) {
      where.price = {
        ...(minPrice !== undefined && { gte: minPrice }),
        ...(maxPrice !== undefined && { lte: maxPrice }),
      };
    }

    if (fromDate || toDate) {
      where.paidDate = {
        ...(fromDate && { gte: fromDate }),
        ...(toDate && { lte: toDate }),
      };
    }

    if (groupId) {
      where.groupId = groupId;
    }

    if (description) {
      where.description = { contains: description };
    }

    if (type) {
      where.type = { equals: type };
    }

    return this.prisma.paidOther.findMany({
      where,
      include: {
        group: true,
      },
    });
  }

  async findOne(id: number) {
    const paidOther = await this.prisma.paidOther.findFirst({
      where: { id, isDeleted: false },
      include: {
        group: true,
      },
    });
    if (!paidOther) {
      throw new HttpError({ message: `PaidOther with ID ${id} not found` });
    }
    return paidOther;
  }
  async update(id: number, updatePaidOtherDto: UpdatePaidOtherDto) {
    const paidOther = await this.prisma.paidOther.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!paidOther) {
      throw new HttpError({ message: `PaidOther with ID ${id} not found` });
    }
    const { groupId } = updatePaidOtherDto;
    if (groupId) {
      const group = await this.prisma.paidOtherGroup.findFirst({
        where: { id: groupId, isDeleted: false },
      });
      if (!group) {
        throw new HttpError({
          message: `Group with ID ${groupId} not found`,
        });
      }
    }

    return this.prisma.paidOther.update({
      where: { id },
      data: {
        description: updatePaidOtherDto.description ?? paidOther.description,
        groupId: updatePaidOtherDto.groupId ?? paidOther.groupId,
        paidDate: updatePaidOtherDto.paidDate ?? paidOther.paidDate,
        price: updatePaidOtherDto.price ?? paidOther.price,
        type: updatePaidOtherDto.type ?? paidOther.type,
      },
    });
  }

  async remove(id: number) {
    const paidOther = await this.prisma.paidOther.findFirst({
      where: { id, isDeleted: false },
    });
    if (!paidOther) {
      throw new HttpError({ message: `PaidOther with ID ${id} not found` });
    }
    const result = await this.prisma.paidOther.update({
      where: { id },
      data: { isDeleted: true },
    });
    return result;
  }
}
