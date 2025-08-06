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

    if (clientId) {
      const client = await this.prisma.client.findFirst({
        where: { id: clientId, isDeleted: false },
      });
      if (!client) {
        throw new HttpError({
          message: `Client with ID ${clientId} not found or deleted`,
        });
      }
    }

    if (saleId) {
      const sale = await this.prisma.sale.findFirst({
        where: { id: saleId, isDeleted: false },
      });
      if (!sale) {
        throw new HttpError({
          message: `Sale with ID ${saleId} not found or deleted`,
        });
      }
    }

    if (paymentId) {
      const payment = await this.prisma.payment.findFirst({
        where: { id: paymentId, isDeleted: false },
      });
      if (!payment) {
        throw new HttpError({
          message: `Payment with ID ${paymentId} not found or deleted`,
        });
      }
    }

    const paidClient = await this.prisma.paidClient.create({
      data: {
        clientId,
        saleId,
        paymentId,
        paidDate,
        price,
      },
    });
    if (clientId) {
      const client = await this.prisma.client.findFirst({
        where: { id: clientId, isDeleted: false },
      });
      if (!client) {
        throw new HttpError({
          message: `Client with ID ${clientId} not found or deleted`,
        });
      }

      if (client.balance < price) {
        throw new HttpError({
          message: `Client with ID ${clientId} does not have enough balance`,
        });
      }

      if (!saleId) {
        await this.prisma.client.update({
          where: { id: clientId },
          data: { balance: { increment: price } },
        });
      }

      await this.prisma.setting.update({
        where: { id: 1 },
        data: { balance: { increment: price } },
      });
    }
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

  async findOne(id: number) {
    const paidClient = await this.prisma.paidClient.findFirst({
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
  async update(id: number, updatePaidClientDto: UpdatePaidClientDto) {
    const paidClient = await this.prisma.paidClient.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!paidClient) {
      throw new HttpError({ message: `PaidClient with ID ${id} not found` });
    }
    const { clientId, saleId, paymentId } = updatePaidClientDto;
    if (clientId) {
      const client = await this.prisma.client.findFirst({
        where: { id: clientId, isDeleted: false },
      });
      if (!client) {
        throw new HttpError({
          message: `Client with ID ${clientId} not found`,
        });
      }
    }

    if (saleId) {
      const sale = await this.prisma.sale.findFirst({
        where: { id: saleId, isDeleted: false },
      });
      if (!sale) {
        throw new HttpError({ message: `Sale with ID ${saleId} not found` });
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

    return this.prisma.paidClient.update({
      where: { id },
      data: {
        clientId: updatePaidClientDto.clientId ?? paidClient.clientId,
        saleId: updatePaidClientDto.saleId ?? paidClient.saleId,
        paymentId: updatePaidClientDto.paymentId ?? paidClient.paymentId,
        paidDate: updatePaidClientDto.paidDate ?? paidClient.paidDate,
        price: updatePaidClientDto.price ?? paidClient.price,
      },
    });
  }

  async remove(id: number) {
    const paidClient = await this.prisma.paidClient.findFirst({
      where: { id, isDeleted: false },
    });
    if (!paidClient) {
      throw new HttpError({ message: `PaidClient with ID ${id} not found` });
    }
    const result = await this.prisma.paidClient.update({
      where: { id },
      data: { isDeleted: true },
    });
    return result;
  }
}
