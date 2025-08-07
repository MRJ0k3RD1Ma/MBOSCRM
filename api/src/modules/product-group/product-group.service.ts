import { Injectable } from '@nestjs/common';
import { CreateProductGroupDto } from './dto/create-product-group.dto';
import { UpdateProductGroupDto } from './dto/update-product-group.dto';
import { PrismaService } from '../prisma/prisma.service';
import { HttpError } from 'src/common/exception/http.error';
import { FindAllProductGroupQueryDto } from './dto/findAll-product-group.dto,';
import { env } from 'src/common/config';

@Injectable()
export class ProductGroupService {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    if (env.ENV != 'prod') {
      const count = await this.prisma.productGroup.count();
      const requiredCount = 1;
      if (count < requiredCount) {
        for (let i = count; i < requiredCount; i++) {
          await this.create({ name: 'product type' }, 1);
        }
      }
    }
  }

  async create(
    createProductGroupDto: CreateProductGroupDto,
    creatorId: number,
  ) {
    const creator = await this.prisma.user.findUnique({
      where: {
        id: creatorId,
      },
    });
    if (!creator) {
      throw new HttpError({ code: 'Creator not found' });
    }
    const productGroup = await this.prisma.productGroup.create({
      data: {
        name: createProductGroupDto.name,
        registerId: creatorId,
        modifyId: creatorId,
      },
    });
    return productGroup;
  }
  async findAll(dto: FindAllProductGroupQueryDto) {
    const { limit = 10, page = 1, name } = dto;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.productGroup.findMany({
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
      this.prisma.productGroup.count({
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
    const productGroup = await this.prisma.productGroup.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });
    if (!productGroup) {
      throw new HttpError({ code: 'ProductGroup not found' });
    }
    return productGroup;
  }

  async update(
    id: number,
    updateProductGroupDto: UpdateProductGroupDto,
    userId: number,
  ) {
    const user = await this.prisma.user.findFirst({
      where: { id: userId, isDeleted: false },
    });

    if (!user) {
      throw HttpError({ message: `User with ID ${userId} not found` });
    }

    const existingGroup = await this.prisma.productGroup.findFirst({
      where: { id, isDeleted: false },
    });

    if (!existingGroup) {
      throw new HttpError({ message: `Product group with ID ${id} not found` });
    }

    return this.prisma.productGroup.update({
      where: { id },
      data: {
        name: updateProductGroupDto.name ?? existingGroup.name,
        modifyId: userId,
      },
    });
  }

  async remove(id: number, modifierId: number) {
    return this.prisma.productGroup.update({
      where: { id },
      data: {
        isDeleted: true,
        modifyId: modifierId,
      },
    });
  }
}
