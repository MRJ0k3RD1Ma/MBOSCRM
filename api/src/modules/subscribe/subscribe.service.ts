import { Injectable } from '@nestjs/common';
import { CreateSubscribeDto } from './dto/create-subscribe.dto';
import { UpdateSubscribeDto } from './dto/update-subscribe.dto';
import { PrismaService } from '../prisma/prisma.service';
import { HttpError } from 'src/common/exception/http.error';
import { FindAllSubscribeQueryDto } from './dto/findAll-subscribe-query.dto';
import { Prisma, SubscribeState } from '@prisma/client';
import { Cron } from '@nestjs/schedule';
import dayjs from 'dayjs';

@Injectable()
export class SubscribeService {
  constructor(private readonly prisma: PrismaService) {}

  @Cron('* * 8 * * *')
  async cron() {
    const subscribeSales = await this.prisma.saleProduct.findMany({
      where: {
        is_subscribe: true,
      },

      include: { sale: true, product: true },
    });

    for (const subscribeSale of subscribeSales) {
      const subscribe = await this.prisma.subscribe.findFirst({
        where: {
          saleId: subscribeSale.saleId,

          paying_date: {
            gt: dayjs(new Date())
              .set('day', subscribeSale.sale.subscribe_generate_day + 1)
              .toDate(),
          },
        },
      });

      if (!subscribe) {
        this.create({
          clientId: subscribeSale.sale.clientId,
          paid: subscribeSale.product.price,
          price: subscribeSale.product.price,
          saleId: subscribeSale.saleId,
          state: SubscribeState.NOTPAYING,
          payingDate: dayjs(new Date())
            .add(1, 'month')
            .set('day', subscribeSale.sale.subscribe_generate_day)
            .toDate(),
        });
      }
    }
  }

  async create(createSubscribeDto: CreateSubscribeDto) {
    const { clientId, paid, price, saleId, state, payingDate } =
      createSubscribeDto;

    const client = await this.prisma.client.findFirst({
      where: { id: clientId, isDeleted: false },
    });

    if (!client) {
      throw new HttpError({
        message: `Client with ID ${clientId} not found`,
      });
    }

    const sale = await this.prisma.sale.findFirst({
      where: { id: saleId, isDeleted: false },
    });

    if (!sale) {
      throw new HttpError({
        message: `Sale with ID ${saleId} not found`,
      });
    }

    const subscribe = await this.prisma.subscribe.create({
      data: {
        paid,
        paying_date: payingDate,
        price,
        state,
        sale: { connect: { id: saleId } },
        client: { connect: { id: clientId } },
      } as Prisma.SubscribeCreateInput,
    });
    await this.prisma.client.update({
      where: { id: clientId },
      data: { balance: client.balance - price },
    });

    return subscribe;
  }

  async findAll(dto: FindAllSubscribeQueryDto) {
    const {
      limit = 10,
      page = 1,
      minPrice,
      maxPrice,
      fromDate,
      toDate,
      clientId,
      state,
      saleId,
    } = dto;

    const where: Prisma.SubscribeWhereInput = {
      isDeleted: false,
    };
    if (clientId) {
      where.clientId = clientId;
    }
    if (saleId) {
      where.saleId = saleId;
    }
    if (minPrice || maxPrice) {
      where.price = {
        ...(minPrice && { gte: minPrice }),
        ...(maxPrice && { lte: maxPrice }),
      };
    }
    if (fromDate || toDate) {
      where.paying_date = {
        ...(fromDate && { gte: fromDate }),
        ...(toDate && { lte: toDate }),
      };
    }
    if (state) {
      where.state = { equals: state };
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.subscribe.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          client: true,
          sale: {
            include: {
              PaidClient: {
                include: { Payment: true },
              },
            },
          },
        },
      }),
      this.prisma.subscribe.count({ where }),
    ]);

    return {
      total,
      page,
      limit,
      data,
    };
  }

  async findOne(id: number) {
    const subscribe = await this.prisma.subscribe.findFirst({
      where: {
        id,
        isDeleted: false,
      },
      include: { sale: true, client: true },
    });
    if (!subscribe) {
      throw new HttpError({
        message: `Subscribe with ID ${id} not found`,
      });
    }
    return subscribe;
  }

  async update(id: number, updateSubscribeDto: UpdateSubscribeDto) {
    let subscribe = await this.prisma.subscribe.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });
    if (!subscribe) {
      throw new HttpError({
        message: `Subscribe with ID ${id} not found`,
      });
    }
    subscribe = await this.prisma.subscribe.update({
      where: { id },
      data: {
        paying_date: updateSubscribeDto.payingDate ?? subscribe.paying_date,
        paid: updateSubscribeDto.paid ?? subscribe.paid,
        price: updateSubscribeDto.price ?? subscribe.price,
        state: updateSubscribeDto.state ?? subscribe.state,
      },
    });

    return subscribe;
  }

  async remove(id: number) {
    const subscribe = await this.prisma.subscribe.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });
    if (!subscribe) {
      throw new HttpError({
        message: `Subscribe with ID ${id} not found`,
      });
    }
    return this.prisma.subscribe.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
