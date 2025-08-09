import { Injectable } from '@nestjs/common';
import { CreatePaidClientDto } from './dto/create-paid-client.dto';
import { UpdatePaidClientDto } from './dto/update-paid-client.dto';
import { PrismaService } from '../prisma/prisma.service';
import { HttpError } from 'src/common/exception/http.error';
import { FindAllQueryPaidClientDto } from './dto/findAll-query-paid-client.dto';
import { Prisma, SubscribeState } from '@prisma/client';
@Injectable()
export class PaidClientService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPaidClientDto: CreatePaidClientDto, registerId: number) {
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
        registerId,
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
      await this.processPayment(client.id, price, saleId);
    }
    return paidClient;
  }

  async processPayment(
    clientId: number,
    paymentAmount: number,
    saleId?: number,
  ) {
    const client = await this.prisma.client.findUnique({
      where: { id: clientId },
    });
    if (!client) throw new Error('Client not found');
    let remainingPayment = paymentAmount;
    let currentBalance = client.balance ?? 0;

    let sales = await this.prisma.sale.findMany({
      where: { clientId, credit: { gt: 0 }, id: { not: saleId } },
      orderBy: { createdAt: 'asc' },
    });

    if (saleId) {
      const prioritySale = await this.prisma.sale.findFirst({
        where: { id: saleId },
      });
      sales = [prioritySale, ...sales];
    }

    for (const sale of sales) {
      if (remainingPayment <= 0) break;
      const payAmount = Math.min(sale.credit, remainingPayment);

      await this.prisma.sale.update({
        where: { id: sale.id },
        data: {
          credit: sale.credit - payAmount,
          dept: (sale.dept ?? 0) + payAmount,
          ...(sale.credit - payAmount <= 0 ? { state: 'CLOSED' } : {}),
        },
      });

      remainingPayment -= payAmount;
      currentBalance += payAmount;
    }
    console.log('b', remainingPayment);
    remainingPayment = await this.checkSubscribtions(clientId, paymentAmount);
    console.log('a', remainingPayment);

    if (remainingPayment > 0) {
      currentBalance += remainingPayment;
      remainingPayment = 0;
    }

    await this.prisma.client.update({
      where: { id: clientId },
      data: { balance: currentBalance },
    });

    return { paidAmount: paymentAmount, newBalance: currentBalance };
  }

  async checkSubscribtions(clientId: number, paymentAmount: number) {
    const subscribtions = await this.prisma.subscribe.findMany({
      where: { state: SubscribeState.NOTPAYING, clientId },
    });
    const client = await this.prisma.client.findUnique({
      where: { id: clientId },
    });

    let remainingPayment = paymentAmount;
    let currentBalance = client.balance ?? 0;

    for (const subscribe of subscribtions) {
      if (remainingPayment <= 0) break;

      const credit = subscribe.price - subscribe.paid;
      const payAmount = Math.min(credit, remainingPayment);

      await this.prisma.subscribe.update({
        where: { id: subscribe.id },
        data: {
          paid: subscribe.paid + payAmount,
          state:
            subscribe.paid + payAmount == subscribe.price
              ? SubscribeState.PAID
              : SubscribeState.NOTPAYING,
        },
      });

      remainingPayment -= payAmount;
      currentBalance += payAmount;
    }

    this.prisma.client.update({
      where: { id: clientId },
      data: { balance: currentBalance },
    });
    return remainingPayment;
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
        modify: true,
        register: true,
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
