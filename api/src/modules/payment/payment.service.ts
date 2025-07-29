import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllPaymentQueryDto } from './dto/findAll-payment-query.dto';
import { HttpError } from 'src/common/exception/http.error';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createPaymentDto: CreatePaymentDto) {
    const payment = await this.prisma.payment.create({
      data: {
        name: createPaymentDto.name,
        icon: createPaymentDto.icon,
      },
    });
    return payment;
  }

  async findAll(dto: FindAllPaymentQueryDto) {
    const { page = 10, limit = 10, name } = dto;
    const [data, total] = await this.prisma.$transaction([
      this.prisma.payment.findMany({
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
      this.prisma.payment.count({
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
    const payment = await this.prisma.payment.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });
    if (!payment) {
      throw new HttpError({ code: 'Payment not found' });
    }
    return payment;
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const existingPayment = await this.prisma.payment.findFirst({
      where: { id, isDeleted: false },
    });

    if (!existingPayment) {
      throw new HttpError({ message: `Payment with ID ${id} not found` });
    }

    return this.prisma.payment.update({
      where: { id },
      data: updatePaymentDto,
    });
  }

  async remove(id: number) {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
    });
    if (!payment) {
      throw new HttpError({ message: `Payment with ID ${id} not found` });
    }
    return this.prisma.payment.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });
  }
}
