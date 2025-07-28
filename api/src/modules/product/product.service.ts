import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { HttpError } from 'src/common/exception/http.error';
import { FindAllProductQueryDto } from './dto/findAll-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}
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
      countReminder,
      countArrived,
      countSale,
    } = createProductDto;

    const existingGroup = await this.prisma.productGroup.findUnique({
      where: { id: groupId },
    });
    if (!creatorId) {
      throw HttpError({ message: 'Creator not found' });
    }
    if (!existingGroup) {
      throw HttpError({ message: 'Group not found' });
    }
    if (createProductDto.unitId) {
      const existingUnit = await this.prisma.productUnit.findUnique({
        where: { id: unitId },
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
          countReminder,
          countArrived,
          countSale,
          creatorId: creatorId,
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
        countReminder,
        countArrived,
        countSale,
        creatorId: creatorId,
        modifyId: creatorId,
      },
    });
    return product;
  }

  async findAll(dto: FindAllProductQueryDto) {
    const { limit = 10, page = 1, name } = dto;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where: {
          name: {
            contains: name?.trim() || '',
            mode: 'insensitive',
          },
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
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
    });
    if (!product) {
      throw new HttpError({ code: 'Product not found' });
    }
    return product;
  }

  async update(id: number, dto: UpdateProductDto) {
    const existingProduct = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      throw new HttpError({ message: `Product with ID ${id} not found` });
    }

    if (dto.groupId !== undefined) {
      const groupExists = await this.prisma.productGroup.findUnique({
        where: { id: dto.groupId },
      });
      if (!groupExists) {
        throw new HttpError({
          message: `Group with ID ${dto.groupId} not found`,
        });
      }
    }

    if (dto.unitId !== undefined) {
      const unitExists = await this.prisma.productUnit.findUnique({
        where: { id: dto.unitId },
      });
      if (!unitExists) {
        throw new HttpError({
          message: `Unit with ID ${dto.unitId} not found`,
        });
      }
    }

    if (dto.barcode !== undefined) {
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
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw HttpError({ code: 'Product not found' });
    }
    return this.prisma.product.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });
  }
}
