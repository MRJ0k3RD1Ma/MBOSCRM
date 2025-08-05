import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientType, Prisma } from '@prisma/client';
import { HttpError } from 'src/common/exception/http.error';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { FindAllClientQueryDto } from './dto/findAll-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { env } from 'src/common/config';
import { faker } from '@faker-js/faker';

@Injectable()
export class ClientService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    if (env.ENV != 'prod') {
      const clientCount = await this.prisma.client.count();
      const requiredCount = 5;
      if (clientCount < requiredCount) {
        for (let i = clientCount; i < requiredCount; i++) {
          await this.create(
            {
              address: faker.location.streetAddress(),
              description: faker.person.jobTitle(),
              districtId: 1733223,
              regionId: 1733,
              inn: faker.commerce.isbn(),
              name: faker.person.fullName(),
              phone: faker.phone.number(),
              typeId: 1,
            },
            1,
          );
        }
      }
    }
  }

  async create(createClientDto: CreateClientDto, creatorId: number) {
    if (!creatorId) {
      throw HttpError({ message: 'Creator not found' });
    }
    const existingPhone = await this.prisma.client.findFirst({
      where: { phone: createClientDto.phone, isDeleted: false },
    });
    if (existingPhone) {
      throw HttpError({ code: 'Phone already exists' });
    }

    if (createClientDto.districtId) {
      const district = await this.prisma.district.findUnique({
        where: { id: createClientDto.districtId },
      });
      if (!district) {
        throw HttpError({ code: 'District not found' });
      }
    }

    if (createClientDto.regionId) {
      const region = await this.prisma.region.findUnique({
        where: { id: createClientDto.regionId },
      });
      if (!region) {
        throw HttpError({ code: 'Region not found' });
      }
    }

    let type: ClientType;
    if (createClientDto.typeId) {
      type = await this.prisma.clientType.findFirst({
        where: { id: createClientDto.typeId, isDeleted: false },
      });
      if (!type) {
        throw HttpError({ code: 'type Not Found' });
      }
    }

    const client = await this.prisma.client.create({
      data: {
        name: createClientDto.name,
        address: createClientDto.address,
        description: createClientDto.description,
        inn: createClientDto.inn,
        typeId: type?.id,
        phone: createClientDto.phone,
        regionId: createClientDto?.regionId,
        districtId: createClientDto?.districtId,
        modifyId: creatorId,
        registerId: creatorId,
      },
    });
    return client;
  }

  async findAll(dto: FindAllClientQueryDto) {
    const {
      limit = 10,
      page = 1,
      name,
      districtId,
      regionId,
      address,
      description,
      inn,
      phone,
    } = dto;

    const where: Prisma.ClientWhereInput = {
      isDeleted: false,
    };

    if (name?.trim()) {
      where.name = { contains: name.trim(), mode: 'insensitive' };
    }

    if (districtId) {
      where.districtId = { equals: districtId };
    }

    if (regionId) {
      where.regionId = { equals: regionId };
    }

    if (address?.trim()) {
      where.address = { contains: address.trim(), mode: 'insensitive' };
    }

    if (description?.trim()) {
      where.description = { contains: description.trim(), mode: 'insensitive' };
    }

    if (inn?.trim()) {
      where.inn = { contains: inn.trim() };
    }

    if (phone?.trim()) {
      where.phone = { contains: phone.trim() };
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.client.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.client.count({ where }),
    ]);
    return {
      total,
      page,
      limit,
      data,
    };
  }

  async findOne(id: number) {
    const client = await this.prisma.client.findFirst({
      where: { id, isDeleted: false },
      include: { ClientType: true, District: true, Region: true },
    });
    if (!client) {
      throw HttpError({ code: 'Client not found' });
    }
    return client;
  }

  async update(id: number, dto: UpdateClientDto, creatorId: number) {
    const client = await this.prisma.client.findFirst({
      where: { id, isDeleted: false },
    });
    if (!client) throw HttpError({ code: 'Client not found' });

    const updateData: Partial<Client> = {
      name: dto.name ?? client.name,
      address: dto.address ?? client.address,
      balance: dto.balance ?? client.balance,
      description: dto.description ?? client.description,
      districtId: dto.districtId ?? client.districtId,
      inn: dto.inn ?? client.inn,
      phone: dto.phone ?? client.phone,
      regionId: dto.regionId ?? client.regionId,
      typeId: dto.typeId ?? client.typeId,
      modifyId: creatorId,
    };

    let type: ClientType;
    if (updateData.typeId) {
      type = await this.prisma.clientType.findFirst({
        where: { id: updateData.typeId, isDeleted: false},
      });
      if (!type) {
        throw HttpError({ code: 'type Not Found' });
      }
      updateData.typeId = type.id;
    }

    const updatedClient = await this.prisma.client.update({
      where: { id },
      data: updateData,
    });

    return updatedClient;
  }

  async remove(id: number) {
    const client = await this.prisma.client.findFirst({
      where: { id: id, isDeleted: false },
    });
    if (!client) {
      throw HttpError({ code: 'Client not found' });
    }
    return await this.prisma.client.update({
      where: { id: id },
      data: { isDeleted: true },
    });
  }
}
