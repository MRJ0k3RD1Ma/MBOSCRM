import { Injectable, Logger } from '@nestjs/common';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllQueryServer } from './dto/findAll-query-server.dto';
import { Prisma, ServerState } from '@prisma/client';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ServerService {
  private readonly logger = new Logger(ServerService.name);

  constructor(private readonly prisma: PrismaService) {}

	@Cron('0 * * * * *')
  async handleExpiredServers() {
    this.logger.log('Checking expired servers...');

    const now = new Date();

    const expiredServers = await this.prisma.server.findMany({
      where: {
        endDate: {
          lt: now,
        },
        state: {
          not: ServerState.CLOSED, 
        },
      },
    });
    console.log(expiredServers);
    
    this.logger.log(`Found ${expiredServers.length} expired servers`);

    for (const server of expiredServers) {
      await this.prisma.server.update({
        where: { id: server.id },
        data: { state: ServerState.CLOSED }, 
      });
    }

    this.logger.log('Expired server statuses updated.');
  }
  
  async create(createServerDto: CreateServerDto, modifyId: number) {
    const server = await this.prisma.server.create({
      data: {
        name: createServerDto.name,
        responsible: createServerDto.responsible,
        plan: createServerDto.plan,
        endDate: createServerDto.endDate,
        modifyId: modifyId,
        registerId: modifyId,
      },
    });
    return server;
  }

  async findAll(dto: FindAllQueryServer) {
    const { page = 1, limit = 10, name, responsible, plan } = dto;

    const where: Prisma.ServerWhereInput = {};

    if (name) {
      where.name = {
        contains: name,
        mode: 'insensitive',
      };
    }

    if (responsible) {
      where.responsible = {
        contains: responsible,
        mode: 'insensitive',
      };
    }

    if (plan) {
      where.plan = plan;
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.server.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          paidServers: true,
        },
        orderBy: {
          endDate: 'desc',
        },
      }),
      this.prisma.server.count({ where }),
    ]);

    return {
      total,
      page,
      limit,
      data,
    };
  }

  async findOne(id: number) {
    const server = await this.prisma.server.findFirst({
      where: { id, isDeleted: false },
    });
    if (!server) {
      throw new Error(`Server with ID ${id} not found`);
    }
    return server;
  }

  async update(id: number, updateServerDto: UpdateServerDto, modifyId: number) {
    const server = await this.prisma.server.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!server) {
      throw new Error(`Server with ID ${id} not found`);
    }

    return this.prisma.server.update({
      where: { id },
      data: {
        name: updateServerDto.name ?? server.name,
        responsible: updateServerDto.responsible ?? server.responsible,
        plan: updateServerDto.plan ?? server.plan,
        endDate: updateServerDto.endDate ?? server.endDate,
        modifyId,
      },
    });
  }

  async remove(id: number) {
    const server = await this.prisma.server.findFirst({
      where: { id, isDeleted: false },
    });
    if (!server) {
      throw new Error(`Server with ID ${id} not found`);
    }
    await this.prisma.server.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
