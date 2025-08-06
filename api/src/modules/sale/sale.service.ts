import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { PrismaService } from '../prisma/prisma.service';
import { HttpError } from 'src/common/exception/http.error';
import { FindAllSaleQueryDto } from './dto/findAll-sale-query.dto';
import { Prisma } from '@prisma/client';
import { SaleProductService } from '../sale-product/sale-product.service';
import { env } from 'src/common/config';

@Injectable()
export class SaleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly saleProductService: SaleProductService,
  ) {}

  async onModuleInit() {
    if (env.ENV != 'prod') {
      const count = await this.prisma.sale.count();
      const requiredCount = 1;
      if (count < requiredCount) {
        for (let i = count; i < requiredCount; i++) {
          await this.create(
            {
              clientId: 1,
              dept: 100,
              products: [{ count: 1, price: 100, productId: 1 }],
              subscribe_begin_date: new Date(),
              subscribe_generate_day: 10,
              date: new Date(),
            },
            1,
          );
        }
      }
    }
  }

  async create(createSaleDto: CreateSaleDto, creatorId: number) {
    const {
      date,
      clientId,
      products,
      subscribe_begin_date,
      subscribe_generate_day,
    } = createSaleDto;

    const client = await this.prisma.client.findFirst({
      where: { id: clientId, isDeleted: false },
    });

    if (!client) {
      throw new HttpError({
        message: `Client with ID ${clientId} not found`,
      });
    }

    const maxCode = await this.prisma.sale.findFirst({
      where: {
        createdAt: {
          lt: new Date(new Date().getFullYear(), 11),
          gt: new Date(new Date().getFullYear(), 0),
        },
      },
      orderBy: { codeId: 'desc' },
    });

    const codeId = (maxCode?.codeId || 0) + 1;

    let sale = await this.prisma.sale.create({
      data: {
        date,
        subscribe_begin_date,
        subscribe_generate_day,
        code: `${new Date().getFullYear() - 2000}-${codeId}`,
        codeId,
        client: { connect: client },
        registerId: creatorId,
        modifyId: creatorId,
      },
    });

    let totalPrice = 0;
    for (const product of products) {
      const saleProduct = await this.saleProductService.create(
        {
          saleId: sale.id,
          count: product.count,
          price: product.price,
          productId: product.productId,
        },
        creatorId,
      );
      totalPrice += saleProduct.priceCount;
    }

    if (client.balance < totalPrice) {
      sale = await this.prisma.sale.update({
        where: { id: sale.id },
        data: {
          price: totalPrice,
          credit: totalPrice - client.balance,
          dept: client.balance,
        },
        include: { SaleProduct: { include: { product: true } } },
      });
      await this.prisma.client.update({
        where: { id: client.id },
        data: { balance: { decrement: sale.dept } },
      });
    } else {
      sale = await this.prisma.sale.update({
        where: { id: sale.id },
        data: {
          price: totalPrice,
          credit: 0,
          dept: totalPrice,
        },
        include: { SaleProduct: { include: { product: true } } },
      });
      await this.prisma.client.update({
        where: { id: client.id },
        data: { balance: { decrement: totalPrice } },
      });
    }

    return sale;
  }

  async findAll(dto: FindAllSaleQueryDto) {
    const {
      limit = 10,
      page = 1,
      minPrice,
      maxPrice,
      fromDate,
      toDate,
      clientId,
      code,
    } = dto;

    const where: Prisma.SaleWhereInput = {
      isDeleted: false,
    };
    if (clientId) {
      where.clientId = clientId;
    }
    if (code) {
      where.code = {
        startsWith: code,
        mode: 'insensitive',
      };
    }
    if (minPrice || maxPrice) {
      where.price = {
        ...(minPrice && { gte: minPrice }),
        ...(maxPrice && { lte: maxPrice }),
      };
    }
    if (fromDate || toDate) {
      where.date = {
        ...(fromDate && { gte: fromDate }),
        ...(toDate && { lte: toDate }),
      };
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.sale.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          SaleProduct: true,
        },
        orderBy: {
          date: 'desc',
        },
      }),
      this.prisma.sale.count({ where }),
    ]);

    return {
      total,
      page,
      limit,
      data,
    };
  }

  async findOne(id: number) {
    const sale = await this.prisma.sale.findFirst({
      where: {
        id,
        isDeleted: false,
      },
      include: { SaleProduct: true },
    });
    if (!sale) {
      throw new HttpError({
        message: `Sale with ID ${id} not found`,
      });
    }
    return sale;
  }

  async update(id: number, updateSaleDto: UpdateSaleDto) {
    const sale = await this.prisma.sale.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });
    if (!sale) {
      throw new HttpError({
        message: `Sale with ID ${id} not found`,
      });
    }
    return this.prisma.sale.update({
      where: { id },
      data: {
        subscribe_begin_date:
          updateSaleDto.subscribe_begin_date ?? sale.subscribe_begin_date,
        subscribe_generate_day:
          updateSaleDto.subscribe_generate_day ?? sale.subscribe_generate_day,
        date: updateSaleDto.date ?? sale.date,
        credit: updateSaleDto.credit ?? sale.credit,
        dept: sale.price - (updateSaleDto.credit || sale.credit),
      },
    });
  }

  async remove(id: number) {
    const sale = await this.prisma.sale.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });
    if (!sale) {
      throw new HttpError({
        message: `Sale with ID ${id} not found`,
      });
    }
    return this.prisma.sale.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
