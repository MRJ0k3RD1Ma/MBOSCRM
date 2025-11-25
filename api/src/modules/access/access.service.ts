import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HttpError } from '../../common/exception/http.error';
import { FindAllAccessQueryDto } from './dto/findAll-access.dto';
import { UpdateAccessDto } from './dto/update-access.dto';
import { env } from '../../common/config';
import { FeatureFlagService } from '../feature-flag/feature-flag.service';
import Axios from 'axios';
import { encrypt } from '../../common/utils/hash/hashing.utils';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AccessService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly featureFlagService: FeatureFlagService,
  ) {}

  private axios = env.IS_MAIN
    ? undefined
    : Axios.create({
        baseURL: env.MAIN_BACKEND_URL,
        headers: { 'x-api-key': encrypt(env.MAIN_KEY) },
      });

  @Cron('0 0 * * *')
  async cron() {
    const { data } = await this.axios.get('/access', {
      params: { limit: 1000 },
    });

    const accesses = data.data;

    for (let access of accesses) {
      await this.prisma.access.upsert({
        where: { key: access.key },
        create: {
          key: access.key,
          isActive: false,
          name: access.name,
          description: access.description,
          price: access.price,
        },
        update: {
          name: access.name,
          description: access.description,
          price: access.price,
        },
      });
    }
    this.featureFlagService.loadFlags();
  }

  async onModuleInit() {
    const keys = ['sms', 'feedback'];
    if (env.IS_MAIN) {
      for (let key of keys) {
        await this.prisma.access.upsert({
          where: { key },
          create: {
            key,
            isActive: true,
            name: key,
            description: key,
            price: 0,
          },
          update: {},
        });
      }
    } else {
      try {
        const { data } = await this.axios.get('/access', {
          params: { limit: 1000 },
        });

        const accesses = data.data;

        for (let access of accesses) {
          await this.prisma.access.upsert({
            where: { key: access.key },
            create: {
              key: access.key,
              isActive: false,
              name: access.name,
              description: access.description,
              price: access.price,
            },
            update: {
              name: access.name,
              description: access.description,
              price: access.price,
            },
          });
        }
      } catch (e) {
        console.log(e);
        throw e;
      }
    }

    this.featureFlagService.loadFlags();
  }

  async findAll(dto: FindAllAccessQueryDto) {
    const { limit = 10, page = 1 } = dto;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.access.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { id: 'desc' },
      }),
      this.prisma.access.count({}),
    ]);

    return {
      total,
      page,
      limit,
      data,
    };
  }

  async findOne(id: number) {
    const access = await this.prisma.access.findFirst({
      where: {
        id,
      },
    });
    if (!access) {
      throw new HttpError({ code: 'access not found' });
    }
    return access;
  }

  async update(id: number, dto: UpdateAccessDto) {
    const access = await this.prisma.access.findFirst({
      where: { id, isDeleted: false },
    });

    if (!access) {
      throw new HttpError({ message: `access with ID ${id} not found` });
    }

    const mainUpdateData = {
      description: dto.description,
      name: dto.name,
      price: dto.price,
    };

    const updateData = {
      ...(env.IS_MAIN ? mainUpdateData : {}),
      isActive: dto.isActive,
    };

    const updated = await this.prisma.access.update({
      where: { id },
      data: updateData,
    });

    return updated;
  }
}
