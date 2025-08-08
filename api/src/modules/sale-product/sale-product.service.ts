import { Injectable } from '@nestjs/common';
import { CreateSaleProductDto } from './dto/create-sale-product.dto';
import { UpdateSaleProductDto } from './dto/update-sale-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { HttpError } from 'src/common/exception/http.error';
import { FindAllSaleProductQueryDto } from './dto/findAll-sale-product-query.dto';
import { Prisma, SubscribeState } from '@prisma/client';
import { SubscribeService } from '../subscribe/subscribe.service';
import dayjs from 'dayjs';

@Injectable()
export class SaleProductService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly subscribeService: SubscribeService,
  ) {}
  async create(createSaleProductDto: CreateSaleProductDto, creatorId: number) {
    const sale = await this.prisma.sale.findFirst({
      where: { id: createSaleProductDto.saleId },
    });
    if (!sale) {
      throw new HttpError({
        message: `Sale with ID ${createSaleProductDto.saleId} not found`,
      });
    }

    const product = await this.prisma.product.findFirst({
      where: { id: createSaleProductDto.productId },
    });
    if (!product) {
      throw new HttpError({
        message: `Product with ID ${createSaleProductDto.productId} not found`,
      });
    }

    if (product.countReminder < createSaleProductDto.count) {
      throw new HttpError({
        message: `Maxsulot soni yetarli emas`,
      });
    }

    const isSubscription =
      product.type === 'SUBSCRIPTION' || product.type === 'SERVICE';
    const priceCount = product.price * createSaleProductDto.count;

    const saleProduct = await this.prisma.saleProduct.create({
      data: {
        saleId: createSaleProductDto.saleId,
        productId: createSaleProductDto.productId,
        count: createSaleProductDto.count,
        price: product.price,
        priceCount,
        is_subscribe: isSubscription,
        registerId: creatorId,
        modifyId: creatorId,
      },
      include: { product: true },
    });
    if (saleProduct.is_subscribe) {
      this.subscribeService.create({
        clientId: sale.clientId,
        paid: 0,
        price: saleProduct.product.price,
        saleId: sale.id,
        state: SubscribeState.NOTPAYING,
        payingDate: dayjs(new Date()).add(1, 'month').toDate(),
      });
    }

    await this.prisma.product.update({
      where: { id: product.id },
      data: {
        countReminder: {
          decrement: createSaleProductDto.count,
        },
        countSale: {
          increment: createSaleProductDto.count,
        },
        modifyId: creatorId,
      },
    });
    return saleProduct;
  }

  async findAll(dto: FindAllSaleProductQueryDto) {
    const {
      limit = 10,
      page = 1,
      saleId,
      clientId,
      productId,
      isSubscribe,
    } = dto;

    const where: Prisma.SaleProductWhereInput = {
      isDeleted: false,
    };
    if (saleId) {
      where.saleId = saleId;
    }

    if (clientId) {
      where.sale = { clientId };
    }

    if (productId) {
      where.productId = productId;
    }

    if (isSubscribe !== undefined) {
      where.is_subscribe = { equals: isSubscribe };
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.saleProduct.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          product: { include: { ProductUnit: true } },
          sale: true,
          modify: true,
          register: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.saleProduct.count({ where }),
    ]);

    return {
      total,
      page,
      limit,
      data,
    };
  }

  async findOne(id: number) {
    const saleProduct = await this.prisma.saleProduct.findFirst({
      where: { id, isDeleted: false },

      include: { product: true },
    });
    if (!saleProduct) {
      throw new HttpError({
        message: `SaleProduct with ID ${id} not found`,
      });
    }
    return saleProduct;
  }

  async update(
    id: number,
    updateSaleProductDto: UpdateSaleProductDto,
    modifyId: number,
  ) {
    const saleProduct = await this.prisma.saleProduct.findFirst({
      where: { id, isDeleted: false },
    });
    if (!saleProduct) {
      throw new HttpError({ message: `SaleProduct with ID ${id} not found` });
    }

    if (updateSaleProductDto.saleId) {
      const sale = await this.prisma.sale.findFirst({
        where: { id: updateSaleProductDto.saleId },
      });
      if (!sale) {
        throw new HttpError({
          message: `Sale with ID ${updateSaleProductDto.saleId} not found`,
        });
      }
    }

    let product = null;
    if (updateSaleProductDto.productId) {
      product = await this.prisma.product.findFirst({
        where: { id: updateSaleProductDto.productId },
      });
      if (!product) {
        throw new HttpError({
          message: `Product with ID ${updateSaleProductDto.productId} not found`,
        });
      }
    }

    const finalPrice = product.price ?? saleProduct.price;
    const finalCount = updateSaleProductDto.count ?? saleProduct.count;
    const totalPriceCount = finalPrice * finalCount;

    const isSubscribe = product
      ? product.type === 'SUBSCRIPTION' || product.type === 'SERVICE'
      : saleProduct.is_subscribe;

    return this.prisma.saleProduct.update({
      where: { id },
      data: {
        saleId: updateSaleProductDto.saleId ?? saleProduct.saleId,
        productId: updateSaleProductDto.productId ?? saleProduct.productId,
        count: finalCount,
        price: finalPrice,
        priceCount: totalPriceCount,
        is_subscribe: isSubscribe,
        modifyId: modifyId,
      },
    });
  }

  async remove(id: number, modifyId: number) {
    const saleProduct = await this.prisma.saleProduct.findFirst({
      where: { id, isDeleted: false },
    });
    if (!saleProduct) {
      throw new HttpError({ message: `SaleProduct with ID ${id} not found` });
    }
    return this.prisma.saleProduct.update({
      where: { id },
      data: { isDeleted: true, modifyId: modifyId },
    });
  }
}
