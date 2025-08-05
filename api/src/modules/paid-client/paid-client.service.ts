import { Injectable } from '@nestjs/common';
import { CreatePaidClientDto } from './dto/create-paid-client.dto';
import { UpdatePaidClientDto } from './dto/update-paid-client.dto';
import { PrismaService } from '../prisma/prisma.service';
import { HttpError } from 'src/common/exception/http.error';
import { FindAllQueryPaidClientDto } from './dto/findAll-query-paid-client.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PaidClientService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createPaidClientDto: CreatePaidClientDto) {
    const { clientId, saleId, paymentId, paidDate, price } =
      createPaidClientDto;
    const client = await this.prisma.client.findUnique({
      where: { id: clientId },
    });
    if (!client) {
      throw new HttpError({ message: `Client with ID ${clientId} not found` });
    }
    const sale = await this.prisma.sale.findUnique({
      where: { id: saleId },
    });
    if (!sale) {
      throw new HttpError({ message: `Sale with ID ${saleId} not found` });
    }
    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId },
    });
    if (!payment) {
      throw new HttpError({
        message: `Payment with ID ${paymentId} not found`,
      });
    }
    const paidClient = await this.prisma.paidClient.create({
      data: {
        clientId,
        saleId,
        paymentId,
        paidDate: paidDate,
        price,
      },
    });
    return paidClient;
  }

  async findAll(dto: FindAllQueryPaidClientDto) {
    const {
      minPrice,
      maxPrice,
      fromDate,
      toDate,
      clientId,
      saleId,
      paymentId,
    } = dto;

    const where: Prisma.PaidClientWhereInput = {
      isDeleted: false,
    };

    if (minPrice || maxPrice) {
      where.price = {
        ...(minPrice && { gte: minPrice }),
        ...(maxPrice && { lte: maxPrice }),
      };
    }
    if (fromDate || toDate) {
      where.paidDate = {
        ...(fromDate && { gte: fromDate }),
        ...(toDate && { lte: toDate }),
      };
      if (clientId) {
        where.clientId = clientId;
      }
      if (saleId) {
        where.saleId = saleId;
      }
      if (paymentId) {
        where.paymentId = paymentId;
      }

      return this.prisma.paidClient.findMany({
        where,
        include: {
          Client: true,
          Sale: true,
          Payment: true,
        },
      });
    }
  }
  async findOne(id: number) { 
    const paidClient = await this.prisma.paidClient.findUnique({
      where: { id, isDeleted: false },
      include: {
        Client: true,
        Sale: true,
        Payment: true,
      },
    });
    if (!paidClient) {
      throw new HttpError({ message: `PaidClient with ID ${id} not found` });
    }
    return paidClient;
  }

  update(id: number, updatePaidClientDto: UpdatePaidClientDto) {
    return `This action updates a #${id} paidClient`;
  }

  remove(id: number) {
    return `This action removes a #${id} paidClient`;
  }
}
