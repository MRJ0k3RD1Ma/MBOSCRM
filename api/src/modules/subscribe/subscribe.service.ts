import { Injectable } from '@nestjs/common';
import { CreateSubscribeDto } from './dto/create-subscribe.dto';
import { UpdateSubscribeDto } from './dto/update-subscribe.dto';
import { PrismaService } from '../prisma/prisma.service';
import { HttpError } from 'src/common/exception/http.error';
import { FindAllSubscribeQueryDto } from './dto/findAll-subscribe-query.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class SubscribeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSubscribeDto: CreateSubscribeDto) {
    const { clientId, paid, price, saleId, state, payingDate } =
      createSubscribeDto;

    const client = await this.prisma.client.findUnique({
      where: { id: clientId },
    });

    if (!client) {
      throw new HttpError({
        message: `Client with ID ${clientId} not found`,
      });
    }

    const sale = await this.prisma.sale.findUnique({
      where: { id: saleId },
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
        clientId,
        saleId,
        state,
      },
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
          sale: true,
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
      data: {
        paying_date: updateSubscribeDto.payingDate ?? subscribe.paying_date,
        paid: updateSubscribeDto.paid ?? subscribe.paid,
        price: updateSubscribeDto.price ?? subscribe.price,
        state: updateSubscribeDto.state ?? subscribe.state,
      },
    });
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
