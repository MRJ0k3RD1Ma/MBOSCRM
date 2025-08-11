import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HttpError } from 'src/common/exception/http.error';
import { Prisma } from '@prisma/client';
import { CreateArrivedProductDto } from './dto/create-arrived-product.dto';
import { FindAllArrivedProductQueryDto } from './dto/findAll-arrived-product-query.dto';
import { UpdateArrivedProductDto } from './dto/update-arrived-product.dto';

@Injectable()
export class ArrivedProductService {
  constructor(private readonly prisma: PrismaService) {}
  async create(
    createArrivedProductDto: CreateArrivedProductDto,
    registerId: number,
  ) {
    // eslint-disable-next-line prefer-const
    let { arrivedId, count, productId, price } = createArrivedProductDto;

    if (!arrivedId) {
      throw new HttpError({
        message: `arrived Id it not defined`,
      });
    }

    const arrived = await this.prisma.arrived.findFirst({
      where: { id: arrivedId, isDeleted: false },
    });
    if (!arrived) {
      throw new HttpError({
        message: `Arrived with ID ${arrivedId} not found`,
      });
    }

    const product = await this.prisma.product.findFirst({
      where: { id: productId, isDeleted: false },
    });
    if (!product) {
      throw new HttpError({
        message: `Product with ID ${productId} not found`,
      });
    }

    price = product.priceIncome;

    const arrivedproduct = await this.prisma.arrivedProduct.create({
      data: {
        count,
        price,
        priceCount: price * count,
        arrivedId,
        productId,
        registerId,
      },
    });

    await this.prisma.product.update({
      where: { id: productId },
      data: {
        countArrived: {
          increment: count,
        },
        countReminder: {
          increment: count,
        },
      },
    });

    return arrivedproduct;
  }

  async findAll(dto: FindAllArrivedProductQueryDto) {
    const {
      limit = 10,
      page = 1,
      minPrice,
      maxPrice,
      productId,
      supplierId,
      arrivedId,
    } = dto;

    const where: Prisma.ArrivedProductWhereInput = {
      isDeleted: false,
    };
    if (supplierId) {
      where.Arrived = { supplierId };
    }

    if (arrivedId) {
      where.arrivedId = arrivedId;
    }

    if (productId) {
      where.productId = productId;
    }

    if (minPrice || maxPrice) {
      where.price = {
        ...(minPrice && { gte: minPrice }),
        ...(maxPrice && { lte: maxPrice }),
      };
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.arrivedProduct.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          Arrived: { include: { supplier: true } },
          Product: { include: { ProductUnit: true } },
          register: true,
        },
      }),
      this.prisma.arrivedProduct.count({ where }),
    ]);

    return {
      total,
      page,
      limit,
      data,
    };
  }

  async findOne(id: number) {
    const arrivedproduct = await this.prisma.arrivedProduct.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });
    if (!arrivedproduct) {
      throw new HttpError({
        message: `ArrivedProduct with ID ${id} not found`,
      });
    }
    return arrivedproduct;
  }

  async update(id: number, updateArrivedProductDto: UpdateArrivedProductDto) {
    const arrivedproduct = await this.prisma.arrivedProduct.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });
    if (!arrivedproduct) {
      throw new HttpError({
        message: `ArrivedProduct with ID ${id} not found`,
      });
    }
    return this.prisma.arrivedProduct.update({
      where: { id },
      data: {
        price: updateArrivedProductDto.price || arrivedproduct.price,
        count: updateArrivedProductDto.count || arrivedproduct.count,
        priceCount:
          (updateArrivedProductDto.price || arrivedproduct.price) *
            (updateArrivedProductDto.count || arrivedproduct.count) ||
          arrivedproduct.priceCount,
      },
    });
  }

  async remove(id: number) {
    const arrivedproduct = await this.prisma.arrivedProduct.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });
    if (!arrivedproduct) {
      throw new HttpError({
        message: `ArrivedProduct with ID ${id} not found`,
      });
    }
    return this.prisma.arrivedProduct.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
