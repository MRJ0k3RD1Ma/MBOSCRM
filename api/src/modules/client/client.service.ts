import { Injectable } from '@nestjs/common';
import { Client, ClientType, Prisma } from '@prisma/client';
import { HttpError } from 'src/common/exception/http.error';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { FindAllClientQueryDto } from './dto/findAll-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createClientDto: CreateClientDto) {
    const existingClient = await this.prisma.client.findFirst({
      where: { name: createClientDto.name },
    });
    if (existingClient) {
      throw HttpError({ code: 'Client with this name already exists' });
    }

    let type: ClientType;
    if (createClientDto.typeId) {
      type = await this.prisma.clientType.findUnique({
        where: { id: createClientDto.typeId },
      });
      if (!type) {
        throw HttpError({ code: 'type Not Found' });
      }
    }

    const client = await this.prisma.client.create({
      data: {
        ...createClientDto,
        typeId: type.id,
        regionId: createClientDto.regionId,
        districtId: createClientDto.districtId,
        modifyId: 1,
        registerId: 1,
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
      name: { contains: name?.trim() || '' },
      districtId: { equals: districtId },
      regionId: { equals: regionId },
      address: { contains: address?.trim() || '' },
      description: { contains: description?.trim() || '' },
      inn: { contains: inn?.trim() || '' },
      phone: { contains: phone?.trim() || '' },
      isDeleted: false,
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.client.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.client.count({
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
    const client = await this.prisma.client.findUnique({
      where: { id, isDeleted: false },
      include: { ClientType: true, District: true, Region: true },
    });
    if (!client) {
      throw HttpError({ code: 'Client not found' });
    }
    return client;
  }

  async update(id: number, dto: UpdateClientDto) {
    const client = await this.prisma.client.findUnique({
      where: { id, isDeleted: false },
    });
    if (!client) throw HttpError({ code: 'Client not found' });

    const updateData: Partial<Client> = {
      name: dto.name || client.name,
      address: dto.address || client.address,
      balance: dto.balance || client.balance,
      description: dto.description || client.description,
      districtId: dto.districtId || client.districtId,
      inn: dto.inn || client.inn,
      phone: dto.phone || client.phone,
      regionId: dto.regionId || client.regionId,
      typeId: dto.typeId || client.typeId,
    };

    let type: ClientType;
    if (updateData.typeId) {
      type = await this.prisma.clientType.findUnique({
        where: { id: updateData.typeId },
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
    const client = await this.prisma.client.findUnique({
      where: { id: id },
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
