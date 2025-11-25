import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientCrm, Prisma } from '@prisma/client';
import { HttpError } from '../../common/exception/http.error';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientCrmDto } from './dto/create-client-crm.dto';
import { v4 as uuidv4 } from 'uuid';
import { FindAllClientCrmQueryDto } from './dto/findAll-client-crm.dto';
import { UpdateClientCrmDto } from './dto/update-client-crm.dto';

@Injectable()
export class ClientCrmService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {}

  async create(createClientCrmDto: CreateClientCrmDto) {
    const client = await this.prisma.client.findFirst({
      where: { id: createClientCrmDto.clientId, isDeleted: false },
    });
    if (!client) {
      throw HttpError({ code: 'Client Not Found' });
    }

    const product =
      createClientCrmDto.productId !== undefined
        ? await this.prisma.product.findUnique({
            where: { id: createClientCrmDto.productId },
          })
        : undefined;

    const clientCrm = await this.prisma.clientCrm.create({
      data: {
        key: uuidv4(),
        clientId: client.id,
        productId: product?.id,
        domain: createClientCrmDto.domain,
        isFullAccess: createClientCrmDto.isFullAccess,
        expiredFullAccess: createClientCrmDto.expiredFullAccess,
        balance: 0,
      },
    });
    return clientCrm;
  }

  async findAll(dto: FindAllClientCrmQueryDto) {
    const { limit = 10, page = 1, clientId, domain, key } = dto;

    const where: Prisma.ClientCrmWhereInput = {
      isDeleted: false,
    };

    if (domain?.trim()) {
      where.domain = { contains: domain.trim(), mode: 'insensitive' };
    }

    if (key?.trim()) {
      where.key = { contains: key.trim() };
    }

    if (clientId) {
      where.clientId = clientId;
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.clientCrm.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { id: 'desc' },
        include: {
          client: true,
        },
      }),
      this.prisma.clientCrm.count({ where }),
    ]);
    return {
      total,
      page,
      limit,
      data,
    };
  }

  async findOne(id: number) {
    const clientCrm = await this.prisma.clientCrm.findFirst({
      where: { id, isDeleted: false },
      include: { client: true },
    });
    if (!clientCrm) {
      throw HttpError({ code: 'Client Crm not found' });
    }
    return clientCrm;
  }

  async update(id: number, dto: UpdateClientCrmDto) {
    const clientCrm = await this.prisma.clientCrm.findFirst({
      where: { id, isDeleted: false },
    });
    if (!clientCrm) throw HttpError({ code: 'Client Crm not found' });

    const product =
      dto.productId !== undefined
        ? await this.prisma.product.findUnique({
            where: { id: dto.productId },
          })
        : undefined;

    const updateData: Partial<ClientCrm> = {
      productId: product?.id ?? clientCrm.productId,
      domain: dto.domain ?? clientCrm.domain,
      isFullAccess: dto.isFullAccess ?? clientCrm.isFullAccess,
      expiredFullAccess: dto.expiredFullAccess ?? clientCrm.expiredFullAccess,
    };

    const updatedClientCrm = await this.prisma.clientCrm.update({
      where: { id },
      data: updateData,
    });

    return updatedClientCrm;
  }

  async remove(id: number) {
    const clientCrm = await this.prisma.clientCrm.findFirst({
      where: { id: id, isDeleted: false },
    });
    if (!clientCrm) {
      throw HttpError({ code: 'Client Crm not found' });
    }
    return await this.prisma.clientCrm.update({
      where: { id: id },
      data: { isDeleted: true },
    });
  }
}
