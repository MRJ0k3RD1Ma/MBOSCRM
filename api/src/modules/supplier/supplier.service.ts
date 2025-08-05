import { Injectable } from '@nestjs/common';
import { HttpError } from 'src/common/exception/http.error';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { FindAllSupplierQueryDto } from './dto/findAll-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Prisma, Supplier } from '@prisma/client';
import { env } from 'src/common/config';
import { faker } from '@faker-js/faker';

@Injectable()
export class SupplierService {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    if (env.ENV != 'prod') {
      const count = await this.prisma.supplier.count();
      const requiredCount = 5;
      if (count < requiredCount) {
        for (let i = count; i < requiredCount; i++) {
          await this.create(
            {
              balance: 0,
              description: 'supplier description',
              name: faker.person.fullName(),
              phone: faker.phone.number(),
            },
            1,
          );
        }
      }
    }
  }

  async create(createSupplierDto: CreateSupplierDto, creatorId: number) {
    if (!creatorId) {
      throw HttpError({ code: 'Creator not found' });
    }
    if (createSupplierDto.phone) {
      const existingPhone = await this.prisma.supplier.findFirst({
        where: { phone: createSupplierDto.phone, isDeleted: false },
      });
      if (existingPhone) {
        throw HttpError({ code: 'Phone already exists' });
      }
    }

    const supplier = await this.prisma.supplier.create({
      data: {
        name: createSupplierDto.name,
        balance: createSupplierDto.balance,
        description: createSupplierDto.description,
        phone: createSupplierDto.phone,
        phoneTwo: createSupplierDto.phoneTwo,
        modifyId: creatorId,
        registerId: creatorId,
      },
    });
    return supplier;
  }

  async findAll(dto: FindAllSupplierQueryDto) {
    const { limit = 10, page = 1, name, description, phone } = dto;

    const where: Prisma.SupplierWhereInput = {
      isDeleted: false,
    };

    if (name?.trim()) {
      where.name = { contains: name.trim() };
    }

    if (description?.trim()) {
      where.description = { contains: description.trim() };
    }

    if (phone?.trim()) {
      where.OR = [
        { phone: { contains: phone.trim() } },
        { phoneTwo: { contains: phone.trim() } },
      ];
    }

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
    const supplier = await this.prisma.supplier.findFirst({
      where: { id, isDeleted: false },
    });
    if (!supplier) {
      throw HttpError({ code: 'Supplier not found' });
    }
    return supplier;
  }

  async update(id: number, dto: UpdateSupplierDto, creatorId: number) {
    const supplier = await this.prisma.supplier.findFirst({
      where: { id, isDeleted: false },
    });
    if (!supplier) throw HttpError({ code: 'Supplier not found' });

    const updateData: Partial<Supplier> = {
      name: dto.name ?? supplier.name,
      balance: dto.balance ?? supplier.balance,
      description: dto.description ?? supplier.description,
      phone: dto.phone ?? supplier.phone,
      phoneTwo: dto.phoneTwo ?? supplier.phoneTwo,
      modifyId: creatorId,
    };

    const updatedSupplier = await this.prisma.supplier.update({
      where: { id },
      data: updateData,
    });

    return updatedSupplier;
  }

  async remove(id: number) {
    const supplier = await this.prisma.supplier.findFirst({
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
