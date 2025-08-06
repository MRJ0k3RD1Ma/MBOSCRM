import { Injectable } from '@nestjs/common';
import { CreatePaidServerDto } from './dto/create-paid-server.dto';
import { UpdatePaidServerDto } from './dto/update-paid-server.dto';
import { PrismaService } from '../prisma/prisma.service';
import { HttpError } from 'src/common/exception/http.error';
import { FindAllQueryPaidServerDto } from './dto/findAll-query-paid-server.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PaidServerService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createPaidServerDto: CreatePaidServerDto) {
    const { description, price, paymentTypeId, serverId, endDate } =
      createPaidServerDto;

    if (serverId) {
      //TO-DO server integration
      const server = await this.prisma.server.findFirst({
        where: { id: serverId, isDeleted: false },
      });
      if (!server) {
        throw new HttpError({
          message: `Server with ID ${serverId} not found or deleted`,
        });
      }
    }

    const paidServer = await this.prisma.paidServer.create({
      data: {
        description,
        price,
        endDate,
        serverId,
        paymentTypeId,
      },
    });

    return paidServer;
  }

  async findAll(dto: FindAllQueryPaidServerDto) {
    const { minPrice, maxPrice, fromDate, toDate, description, serverId } = dto;

    const where: Prisma.PaidServerWhereInput = {
      isDeleted: false,
    };

    if (minPrice || maxPrice) {
      where.price = {
        ...(minPrice !== undefined && { gte: minPrice }),
        ...(maxPrice !== undefined && { lte: maxPrice }),
      };
    }

    if (fromDate || toDate) {
      where.endDate = {
        ...(fromDate && { gte: fromDate }),
        ...(toDate && { lte: toDate }),
      };
    }

    if (serverId) {
      where.serverId = serverId;
    }

    if (description) {
      where.description = { contains: description };
    }

    return this.prisma.paidServer.findMany({
      where,
      include: {
        paymentType: true,
      },
    });
  }

  async findOne(id: number) {
    const paidServer = await this.prisma.paidServer.findFirst({
      where: { id, isDeleted: false },
      include: {
        paymentType: true,
      },
    });
    if (!paidServer) {
      throw new HttpError({ message: `PaidServer with ID ${id} not found` });
    }
    return paidServer;
  }

  async update(id: number, updatePaidServerDto: UpdatePaidServerDto) {
    const paidServer = await this.prisma.paidServer.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!paidServer) {
      throw new HttpError({ message: `PaidServer with ID ${id} not found` });
    }
    const { serverId } = updatePaidServerDto;
    if (serverId) {
      const server = await this.prisma.server.findFirst({
        where: { id: serverId, isDeleted: false },
      });
      if (!server) {
        throw new HttpError({
          message: `Server with ID ${serverId} not found`,
        });
      }
    }

    return this.prisma.paidServer.update({
      where: { id },
      data: {
        description: updatePaidServerDto.description ?? paidServer.description,
        serverId: updatePaidServerDto.serverId ?? paidServer.serverId,
        endDate: updatePaidServerDto.endDate ?? paidServer.endDate,
        price: updatePaidServerDto.price ?? paidServer.price,
        paymentTypeId:
          updatePaidServerDto.paymentTypeId ?? paidServer.paymentTypeId,
      },
    });
  }

  async remove(id: number) {
    const paidServer = await this.prisma.paidServer.findFirst({
      where: { id, isDeleted: false },
    });
    if (!paidServer) {
      throw new HttpError({ message: `PaidServer with ID ${id} not found` });
    }
    const result = await this.prisma.paidServer.update({
      where: { id },
      data: { isDeleted: true },
    });
    return result;
  }
}
