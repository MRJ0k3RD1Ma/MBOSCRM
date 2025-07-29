import { Injectable } from '@nestjs/common';
import { PaidSupplier, Prisma } from '@prisma/client';
import { HttpError } from 'src/common/exception/http.error';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaidSupplierDto } from './dto/create-paid-supplier.dto';
import { FindAllPaidSupplierQueryDto } from './dto/findAll-paid-supplier.dto';
import { UpdatePaidSupplierDto } from './dto/update-paid-supplier.dto';

@Injectable()
export class PaidSupplierService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createPaidSupplierDto: CreatePaidSupplierDto,
    creatorId: number,
  ) {
    const payment = await this.prisma.payment.findUnique({
      where: { id: createPaidSupplierDto.paymentId },
    });
    if (!payment) {
      throw new HttpError({ message: 'Payment Not Found' });
    }

    const supplier = await this.prisma.supplier.findUnique({
      where: { id: createPaidSupplierDto.supplierId },
    });
    if (!supplier) {
      throw new HttpError({ message: 'Supplier Not Found', code: 404 });
    }

    const paidsupplier = await this.prisma.paidSupplier.create({
      data: {
        supplierId: createPaidSupplierDto.supplierId,
        paidDate: createPaidSupplierDto.paidDate,
        price: createPaidSupplierDto.price,
        paymentId: createPaidSupplierDto.paymentId,
        modifyId: creatorId,
        registerId: creatorId,
      },
    });
    return paidsupplier;
  }

  async findAll(dto: FindAllPaidSupplierQueryDto) {
    const { limit = 10, page = 1, maxPaidDate, minPaidDate, supplierId } = dto;

    const where: Prisma.PaidSupplierWhereInput = {
      isDeleted: false,
    };

    if (supplierId) {
      where.supplierId = supplierId;
    }
    if (minPaidDate || maxPaidDate) {
      where.paidDate = {
        ...(minPaidDate && { gt: minPaidDate }),
        ...(maxPaidDate && { lt: maxPaidDate }),
      };
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.paidSupplier.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.paidSupplier.count({
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
    const paidSupplier = await this.prisma.paidSupplier.findFirst({
      where: { id, isDeleted: false },
    });
    if (!paidSupplier) {
      throw HttpError({ code: 'PaidSupplier not found' });
    }
    return paidSupplier;
  }

  async update(id: number, dto: UpdatePaidSupplierDto) {
    const paidsupplier = await this.prisma.paidSupplier.findFirst({
      where: { id, isDeleted: false },
    });
    if (!paidsupplier) throw HttpError({ code: 'PaidSupplier not found' });

    const updateData: Partial<PaidSupplier> = {
      price: dto.price ?? paidsupplier.price,
      paidDate: dto.paidDate ?? paidsupplier.paidDate,
    };

    const updatedPaidSupplier = await this.prisma.paidSupplier.update({
      where: { id },
      data: updateData,
    });

    return updatedPaidSupplier;
  }

  async remove(id: number, modifierId: number) {
    const paidsupplier = await this.prisma.paidSupplier.findUnique({
      where: { id: id },
    });
    if (!paidsupplier) {
      throw HttpError({ code: 'PaidSupplier not found' });
    }
    return await this.prisma.paidSupplier.update({
      where: { id: id },
      data: { isDeleted: true, modifyId: modifierId },
    });
  }
}
