import { Injectable } from '@nestjs/common';
import { HttpError } from 'src/common/exception/http.error';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { FindAllSupplierQueryDto } from './dto/findAll-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Prisma, Supplier } from '@prisma/client';

@Injectable()
export class SupplierService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSupplierDto: CreateSupplierDto) {
    const existingSupplier = await this.prisma.supplier.findFirst({
      where: { name: createSupplierDto.name },
    });
    if (existingSupplier) {
      throw HttpError({ code: 'Supplier with this name already exists' });
    }

    const supplier = await this.prisma.supplier.create({
      data: {
        ...createSupplierDto,
        modifyId: 1,
        registerId: 1,
      },
    });
    return supplier;
  }

  async findAll(dto: FindAllSupplierQueryDto) {
    const { limit = 10, page = 1, name, description, phone } = dto;

    const where: Prisma.SupplierWhereInput = {
      name: { contains: name?.trim() || '' },
      description: { contains: description?.trim() || '' },
      phone: { contains: phone?.trim() || '' },
      phoneTwo: { contains: phone?.trim() || '' },
      isDeleted: false,
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.supplier.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.supplier.count({
        where,
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
    const supplier = await this.prisma.supplier.findUnique({
      where: { id, isDeleted: false },
    });
    if (!supplier) {
      throw HttpError({ code: 'Supplier not found' });
    }
    return supplier;
  }

  async update(id: number, dto: UpdateSupplierDto) {
    const supplier = await this.prisma.supplier.findUnique({
      where: { id, isDeleted: false },
    });
    if (!supplier) throw HttpError({ code: 'Supplier not found' });

    const updateData: Partial<Supplier> = {
      name: dto.name || supplier.name,
      balance: dto.balance || supplier.balance,
      description: dto.description || supplier.description,
      phone: dto.phone || supplier.phone,
      phoneTwo: dto.phoneTwo || supplier.phoneTwo,
    };

    const updatedSupplier = await this.prisma.supplier.update({
      where: { id },
      data: updateData,
    });

    return updatedSupplier;
  }

  async remove(id: number) {
    const supplier = await this.prisma.supplier.findUnique({
      where: { id: id },
    });
    if (!supplier) {
      throw HttpError({ code: 'Supplier not found' });
    }
    return await this.prisma.supplier.update({
      where: { id: id },
      data: { isDeleted: true },
    });
  }
}
