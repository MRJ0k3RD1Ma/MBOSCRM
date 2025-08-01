import { Injectable } from '@nestjs/common';
import { CreateSaleProductDto } from './dto/create-sale-product.dto';
import { UpdateSaleProductDto } from './dto/update-sale-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { HttpError } from 'src/common/exception/http.error';
import { FindAllSaleProductQueryDto } from './dto/findAll-sale-product-query.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class SaleProductService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createSaleProductDto: CreateSaleProductDto, creatorId: number) {
    const sale = await this.prisma.sale.findFirst({
      where: { id: createSaleProductDto.sale_id },
    });
    if (!sale) {
      throw new HttpError({
        message: `Sale with ID ${createSaleProductDto.sale_id} not found`,
      });
    }
    let productType = false;
    const product = await this.prisma.product.findFirst({
      where: { id: createSaleProductDto.product_id },
    });
    if (!product) {
      throw new HttpError({
        message: `Product with ID ${createSaleProductDto.product_id} not found`,
      });
    }
    if (product.type === 'SUBSCRIPTION' || product.type === 'SERVICE') {
      productType = true;
    }
    const priceCount = createSaleProductDto.price * createSaleProductDto.count;
    const saleProduct = await this.prisma.saleProduct.create({
      data: {
        saleId: createSaleProductDto.sale_id,
        productId: createSaleProductDto.product_id,
        count: createSaleProductDto.count,
        price: createSaleProductDto.price,
        priceCount: priceCount,
        is_subscribe: productType,
        registerId: creatorId,
        modifyId: creatorId,
      },
    });
    return saleProduct;
  }

  async findAll(dto: FindAllSaleProductQueryDto) {
    const { limit = 10, page = 1, saleId } = dto;

    const where: Prisma.SaleProductWhereInput = {
      isDeleted: false,
    };
    if (saleId) {
      where.saleId = saleId;
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.saleProduct.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        include: { product: true },
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

    if (updateSaleProductDto.sale_id) {
      const sale = await this.prisma.sale.findFirst({
        where: { id: updateSaleProductDto.sale_id },
      });
      if (!sale) {
        throw new HttpError({
          message: `Sale with ID ${updateSaleProductDto.sale_id} not found`,
        });
      }
    }

    let product = null;
    if (updateSaleProductDto.product_id) {
      product = await this.prisma.product.findFirst({
        where: { id: updateSaleProductDto.product_id },
      });
      if (!product) {
        throw new HttpError({
          message: `Product with ID ${updateSaleProductDto.product_id} not found`,
        });
      }
    }

    const finalPrice = updateSaleProductDto.price ?? saleProduct.price;
    const finalCount = updateSaleProductDto.count ?? saleProduct.count;
    const totalPriceCount = finalPrice * finalCount;

    const isSubscribe = product
      ? product.type === 'SUBSCRIPTION' || product.type === 'SERVICE'
      : saleProduct.is_subscribe;

    return this.prisma.saleProduct.update({
      where: { id },
      data: {
        saleId: updateSaleProductDto.sale_id ?? saleProduct.saleId,
        productId: updateSaleProductDto.product_id ?? saleProduct.productId,
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
