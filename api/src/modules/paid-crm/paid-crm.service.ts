import { Injectable } from '@nestjs/common';
import { CreatePaidCrmDto } from './dto/create-paid-crm.dto';
import { UpdatePaidCrmDto } from './dto/update-paid-crm.dto';
import { PrismaService } from '../prisma/prisma.service';
import { HttpError } from 'src/common/exception/http.error';
import { FindAllQueryPaidCrmDto } from './dto/findAll-query-paid-crm.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PaidCrmService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPaidCrmDto: CreatePaidCrmDto) {
    const { crmId, paymentId, paidDate, price, expiredFullAccess } =
      createPaidCrmDto;

    const crm = await this.prisma.clientCrm.findFirst({
      where: { id: crmId, isDeleted: false },
      include: { product: true, client: true },
    });
    if (!crm) {
      throw new HttpError({
        message: `Crm with ID ${crmId} not found or deleted`,
      });
    }

    const payment = await this.prisma.payment.findFirst({
      where: { id: paymentId, isDeleted: false },
    });
    if (!payment) {
      throw new HttpError({
        message: `Payment with ID ${paymentId} not found or deleted`,
      });
    }

    const paidCrm = await this.prisma.paidCrm.create({
      data: {
        paidDate,
        price,
        crmId,
        paymentId,
        clientId: crm.clientId,
      },
    });

    await this.prisma.setting.update({
      where: { id: 1 },
      data: {
        balance: {
          increment: price,
        },
      },
    });

    await this.prisma.clientCrm.update({
      where: { id: crmId },
      data: { expiredFullAccess, isFullAccess: true },
    });

    return paidCrm;
  }

  async findAll(dto: FindAllQueryPaidCrmDto) {
    const {
      minPrice,
      maxPrice,
      fromDate,
      toDate,
      crmId,
      paymentId,
      limit = 10,
      page = 1,
    } = dto;

    const where: Prisma.PaidCrmWhereInput = {
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

    if (crmId) {
      where.crmId = crmId;
    }

    if (paymentId) {
      where.paymentId = paymentId;
    }

    const paidCrms = await this.prisma.paidCrm.findMany({
      where,
      include: {},
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        id: 'desc',
      },
    });

    const agg = await this.prisma.paidCrm.aggregate({
      _sum: { price: true },
      _count: { _all: true },
    });

    return {
      data: paidCrms,
      page,
      limit,
      total: agg._count._all,
      price: agg._sum.price,
    };
  }

  async findOne(id: number) {
    const paidCrm = await this.prisma.paidCrm.findFirst({
      where: { id, isDeleted: false },
      include: {},
    });
    if (!paidCrm) {
      throw new HttpError({ message: `PaidCrm with ID ${id} not found` });
    }
    return paidCrm;
  }
  async update(id: number, updatePaidCrmDto: UpdatePaidCrmDto) {
    const paidCrm = await this.prisma.paidCrm.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!paidCrm) {
      throw new HttpError({ message: `PaidCrm with ID ${id} not found` });
    }
    const { crmId, paymentId } = updatePaidCrmDto;
    if (crmId) {
      const crm = await this.prisma.clientCrm.findFirst({
        where: { id: crmId, isDeleted: false },
      });
      if (!crm) {
        throw new HttpError({
          message: `Crm with ID ${crmId} not found`,
        });
      }
    }

    if (paymentId) {
      const payment = await this.prisma.payment.findFirst({
        where: { id: paymentId, isDeleted: false },
      });
      if (!payment) {
        throw new HttpError({
          message: `Payment with ID ${paymentId} not found`,
        });
      }
    }

    return this.prisma.paidCrm.update({
      where: { id },
      data: {
        crmId: updatePaidCrmDto.crmId ?? paidCrm.crmId,
        paymentId: updatePaidCrmDto.paymentId ?? paidCrm.paymentId,
        paidDate: updatePaidCrmDto.paidDate ?? paidCrm.paidDate,
        price: updatePaidCrmDto.price ?? paidCrm.price,
      },
    });
  }

  async remove(id: number) {
    const paidCrm = await this.prisma.paidCrm.findFirst({
      where: { id, isDeleted: false },
    });
    if (!paidCrm) {
      throw new HttpError({ message: `PaidCrm with ID ${id} not found` });
    }
    const result = await this.prisma.paidCrm.update({
      where: { id },
      data: { isDeleted: true },
    });
    return result;
  }
}
