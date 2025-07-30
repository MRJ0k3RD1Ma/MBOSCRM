import { Injectable } from '@nestjs/common';
import { CreateArrivedDto } from './dto/create-arrived.dto';
import { UpdateArrivedDto } from './dto/update-arrived.dto';
import { PrismaService } from '../prisma/prisma.service';
import { HttpError } from 'src/common/exception/http.error';
import { FindAllArrivedQueryDto } from './dto/findAll-arrived-query.dto';
import { Prisma } from '@prisma/client';
import { ArrivedProductService } from '../arrived-product/arrived-product.service';

@Injectable()
export class ArrivedService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly arrivedProductService: ArrivedProductService,
  ) {}

  async create(createArrivedDto: CreateArrivedDto, creatorId: number) {
    const {
      date,
      code,
      codeId,
      waybillNumber,
      supplierId,
      description,
      products,
    } = createArrivedDto;

    const existingSupplier = await this.prisma.supplier.findUnique({
      where: { id: supplierId },
    });

    if (!existingSupplier) {
      throw new HttpError({
        message: `Supplier with ID ${supplierId} not found`,
      });
    }

    let arrived = await this.prisma.arrived.create({
      data: {
        date,
        code,
        codeId,
        waybillNumber,
        supplierId,
        description,
        registerId: creatorId,
        modifyId: creatorId,
      },
    });

    let totalPrice = 0;
    for (const product of products) {
      await this.arrivedProductService.create({
        arrivedId: arrived.id,
        count: product.count,
        price: product.price,
        priceCount: product.priceCount,
        productId: product.productId,
      });
      totalPrice += product.priceCount;
    }

    arrived = await this.prisma.arrived.update({
      where: { id: arrived.id },
      data: { price: totalPrice },
      include: { ArrivedProduct: { include: { Product: true } } },
    });

    return arrived;
  }

  async findAll(dto: FindAllArrivedQueryDto) {
    const {
      limit = 10,
      page = 1,
      minPrice,
      maxPrice,
      fromDate,
      toDate,
      supplierId,
      code,
    } = dto;

    const where: Prisma.ArrivedWhereInput = {
      isDeleted: false,
    };
    if (supplierId) {
      where.supplierId = supplierId;
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
      this.prisma.arrived.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          date: 'desc',
        },
      }),
      this.prisma.arrived.count({ where }),
    ]);

    return {
      total,
      page,
      limit,
      data,
    };
  }

  async findOne(id: number) {
    const arrived = await this.prisma.arrived.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });
    if (!arrived) {
      throw new HttpError({
        message: `Arrived with ID ${id} not found`,
      });
    }
    return arrived;
  }

  async update(id: number, updateArrivedDto: UpdateArrivedDto) {
    const arrived = await this.prisma.arrived.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });
    if (!arrived) {
      throw new HttpError({
        message: `Arrived with ID ${id} not found`,
      });
    }
    return this.prisma.arrived.update({
      where: { id },
      data: {
        date: updateArrivedDto.date ?? arrived.date,
        code: updateArrivedDto.code ?? arrived.code,
        codeId: updateArrivedDto.codeId ?? arrived.codeId,
        waybillNumber: updateArrivedDto.waybillNumber ?? arrived.waybillNumber,
        supplierId: updateArrivedDto.supplierId ?? arrived.supplierId,
        description: updateArrivedDto.description ?? arrived.description,
        price: updateArrivedDto.price ?? arrived.price,
      },
    });
  }

  async remove(id: number) {
    const arrived = await this.prisma.arrived.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });
    if (!arrived) {
      throw new HttpError({
        message: `Arrived with ID ${id} not found`,
      });
    }
    return this.prisma.arrived.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
