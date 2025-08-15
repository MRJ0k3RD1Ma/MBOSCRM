import { Injectable, Logger } from '@nestjs/common';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllQueryServer } from './dto/findAll-query-server.dto';
import { Prisma, ServerState } from '@prisma/client';
import { Cron } from '@nestjs/schedule';
import dayjs from 'dayjs';
import { InjectBot } from '@grammyjs/nestjs';
import { Bot, Context } from 'grammy';

@Injectable()
export class ServerService {
  private readonly logger = new Logger(ServerService.name);

  constructor(
    private readonly prisma: PrismaService,
    @InjectBot() private readonly bot: Bot<Context>,
  ) {}

  @Cron('0 0 8 * * *')
  async handleExpiredServers() {
    this.logger.log('Checking expired servers...');

    const now = new Date();

    const sevenDaysLeftServers = await this.prisma.server.findMany({
      where: {
        endDate: {
          lt: dayjs(now).add(7, 'days').toDate(),
        },
        state: {
          not: ServerState.CLOSED,
        },
      },
    });
    if (sevenDaysLeftServers?.length > 0) {
      for (const server of sevenDaysLeftServers) {
        const leftDays = dayjs(server.endDate).diff(now, 'days');
        const users = [];
        users.push(
          ...(await this.prisma.user.findMany({
            where: { UserRole: { name: 'superadmin' } },
          })),
        );
        if (leftDays < 4) {
          users.push(
            ...(await this.prisma.user.findMany({
              where: { UserRole: { name: 'admin' } },
            })),
          );
        }
        for (const user of users) {
          if (!user.chatId) continue;
          try {
            await this.bot.api.sendMessage(
              user.chatId,
              `${server.name} serveri yopilishiga ${Math.abs(dayjs(now).diff(server.endDate, 'days'))} kun qoldi`,
            );
          } catch {}
        }
      }
    }

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

    const where: Prisma.ServerWhereInput = { isDeleted: false };

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

    // eslint-disable-next-line prefer-const
    let [data, total]: any[] = await this.prisma.$transaction([
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

    data = data.map((server) => {
      server.daysLeft = dayjs(server.endDate).diff(new Date(), 'day');
      return server;
    });

    return {
      total,
      page,
      limit,
      data,
    };
  }

  async findOne(id: number) {
    const server: any = await this.prisma.server.findFirst({
      where: { id, isDeleted: false },
    });
    if (!server) {
      throw new Error(`Server with ID ${id} not found`);
    }

    server.daysLeft = dayjs(server.endDate).diff(new Date(), 'days');
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
