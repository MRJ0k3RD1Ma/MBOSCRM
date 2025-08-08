import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { HttpError } from 'src/common/exception/http.error';
import { FindAllProductQueryDto } from './dto/findAll-product.dto';
import { env } from 'src/common/config';
import { faker } from '@faker-js/faker';
import { ProductType } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    if (env.ENV != 'prod') {
      const count = await this.prisma.product.count();
      const requiredCount = 5;
      if (count < requiredCount) {
        for (let i = count; i < requiredCount; i++) {
          await this.create(
            {
              groupId: 1,
              name: faker.commerce.productName(),
              price: +faker.commerce.price(),
              priceIncome: +faker.commerce.price(),
              reminderFirst: 5,
              type: ProductType.DEVICE,
              unitId: 1,
            },
            1,
          );
        }
      }
    }
  }

  async create(createProductDto: CreateProductDto, creatorId: number) {
    const {
      name,
      barcode,
      groupId,
      unitId,
      priceIncome,
      reminderFirst,
      price,
      type,
    } = createProductDto;

    const existingGroup = await this.prisma.productGroup.findFirst({
      where: { id: groupId, isDeleted: false },
    });
    if (!creatorId) {
      throw HttpError({ message: 'Creator not found' });
    }
    if (!existingGroup) {
      throw HttpError({ message: 'Group not found' });
    }
    if (createProductDto.unitId) {
      const existingUnit = await this.prisma.productUnit.findFirst({
        where: { id: unitId, isDeleted: false },
      });
      if (!existingUnit) {
        throw HttpError({ message: 'ProductUnit not found' });
      }
    }
    let barcodeId = 0;

    if (!barcode) {
      const max = await this.prisma.product.findMany({
        where: { barcodeId: { not: null } },
        take: 1,
        orderBy: { barcodeId: 'desc' },
      });
      console.log(createProductDto);
      barcodeId = (max[0]?.barcodeId || 1_000_000) + 1;

      const product = await this.prisma.product.create({
        data: {
          name,
          barcodeId,
          groupId,
          unitId,
          priceIncome,
          reminderFirst,
          price,
          type,
          countReminder: 0,
          countArrived: 0,
          countSale: 0,
          registerId: creatorId,
          modifyId: creatorId,
        },
      });
      return product;
    }
    const product = await this.prisma.product.create({
      data: {
        name,
        barcode,
        groupId,
        unitId,
        priceIncome,
        reminderFirst,
        price,
        type,
        countReminder: 0,
        countArrived: 0,
        countSale: 0,
        registerId: creatorId,
        modifyId: creatorId,
      },
    });
    return product;
  }

  async findAll(dto: FindAllProductQueryDto) {
    const {
      limit = 10,
      page = 1,
      name,
      type,
      barcode,
      groupId,
      unitId,
      minPrice,
      maxPrice,
      minCount,
      maxCount,
    } = dto;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where: {
          name: {
            contains: name?.trim() || '',
            mode: 'insensitive',
          },
          type: { equals: type },
          barcode: { contains: barcode },
          groupId: { equals: groupId },
          unitId: { equals: unitId },
          priceIncome: { gte: minPrice, lte: maxPrice },
          countArrived: { gte: minCount, lte: maxCount },
          isDeleted: false,
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.product.count({
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
    const product = await this.prisma.product.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });
    if (!product) {
      throw new HttpError({ code: 'Product not found' });
    }
    return product;
  }

  async update(id: number, dto: UpdateProductDto) {
    const existingProduct = await this.prisma.product.findFirst({
      where: { id, isDeleted: false },
    });

    if (!existingProduct) {
      throw new HttpError({ message: `Product with ID ${id} not found` });
    }

    if (dto.groupId !== undefined) {
      const groupExists = await this.prisma.productGroup.findFirst({
        where: { id: dto.groupId, isDeleted: false },
      });
      if (!groupExists) {
        throw new HttpError({
          message: `Group with ID ${dto.groupId} not found`,
        });
      }
    }

    if (dto.unitId !== undefined) {
      const unitExists = await this.prisma.productUnit.findFirst({
        where: { id: dto.unitId, isDeleted: false },
      });
      if (!unitExists) {
        throw new HttpError({
          message: `Unit with ID ${dto.unitId} not found`,
        });
      }
    }

    if (dto.barcode !== undefined && dto.barcode !== existingProduct.barcode) {
      const existingWithBarcode = await this.prisma.product.findFirst({
        where: {
          barcode: dto.barcode,
          NOT: { id },
        },
      });
      if (existingWithBarcode) {
        throw new HttpError({
          message: `Barcode "${dto.barcode}" is already used by another product`,
        });
      }
    }

    const updateData: Record<string, any> = {};
    const fields: (keyof UpdateProductDto)[] = [
      'name',
      'barcode',
      'groupId',
      'unitId',
      'priceIncome',
      'reminderFirst',
      'price',
      'type',
      'countReminder',
      'countArrived',
      'countSale',
    ];

    for (const field of fields) {
      if (dto[field] !== undefined) {
        updateData[field] = dto[field];
      }
    }

    const updated = await this.prisma.product.update({
      where: { id },
      data: updateData,
    });

    return updated;
  }

  async remove(id: number) {
    const product = await this.prisma.product.findFirst({
      where: { id, isDeleted: false },
    });
    if (!product) {
      throw new HttpError({ code: 'Product not found' });
    }
    return this.prisma.product.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });
  }
}
