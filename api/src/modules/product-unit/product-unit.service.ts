import { Injectable } from '@nestjs/common';
import { CreateProductUnitDto } from './dto/create-product-unit.dto';
import { UpdateProductUnitDto } from './dto/update-product-unit.dto';
import { PrismaService } from '../prisma/prisma.service';
import { HttpError } from 'src/common/exception/http.error';
import { FindAllProductUnitQueryDto } from './dto/findAll-product-unit-query.dto';

@Injectable()
export class ProductUnitService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateProductUnitDto) {
    const exists = await this.prisma.productUnit.findFirst({
      where: {
        name: dto.name,
        isDeleted: false,
      },
    });

    if (exists) {
      throw new HttpError({
        message: `Product unit "${dto.name}" already exists`,
      });
    }

    return this.prisma.productUnit.create({
      data: {
        name: dto.name,
      },
    });
  }

  async findAll(dto: FindAllProductUnitQueryDto) {
    const { limit = 10, page = 1, name } = dto;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.productUnit.findMany({
        where: {
          name: {
            contains: name?.trim() || '',
            mode: 'insensitive',
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.productUnit.count({
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
    const unit = await this.prisma.productUnit.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!unit) {
      throw new HttpError({ message: `Product unit with ID ${id} not found` });
    }

    return unit;
  }

  async update(id: number, updateProductUnitDto: UpdateProductUnitDto) {
    const unit = await this.prisma.productUnit.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!unit) {
      throw new HttpError({ message: `Product unit with ID ${id} not found` });
    }

    const update = await this.prisma.productUnit.update({
      where: { id },
      data: {
        name: updateProductUnitDto.name ?? unit.name,
      },
    });

    return update;
  }

  async remove(id: number) {
    const unit = await this.prisma.productUnit.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!unit) {
      throw new HttpError({ message: `Product unit with ID ${id} not found` });
    }
    return this.prisma.productUnit.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });
  }
}
