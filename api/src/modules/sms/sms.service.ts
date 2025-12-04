import { Injectable, Optional } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { env } from '../../common/config';
import Axios from 'axios';
import { encrypt } from '../../common/utils/hash/hashing.utils';
import { Cron } from '@nestjs/schedule';
import { EskizService } from '../eskiz/eskiz.service';
import { FeatureFlagService } from '../feature-flag/feature-flag.service';
import { HttpError } from '../../common/exception/http.error';
import { FindAllSmsQueryDto } from './dtos/findAll-sms-query.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class SmsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly featureFlagService: FeatureFlagService,
    @Optional()
    private readonly eskizService?: EskizService,
  ) {}

  private axios = env.IS_MAIN
    ? undefined
    : Axios.create({
        baseURL: env.MAIN_BACKEND_URL,
        headers: { 'x-api-key': encrypt(env.MAIN_KEY) },
      });

  @Cron('0 * * * * *')
  async cron() {
    console.log('cron');
    if (!env.IS_MAIN) return;
    const messagesToSend = await this.prisma.detailization.findMany({
      where: { state: 'NEW' },
    });

    for (let message of messagesToSend) {
      await this.eskizService.sendMessage(message);
    }

    const messagesToCheck=await this.prisma.detailization.findMany({
      where: { state: 'WAITING' ,updatedAt:{lt:new Date(Date.now()-1000*60*5)}},
    })

    for(let message of messagesToCheck){
      const status=await this.eskizService.getSmsStatusByMessageId(message.messageId);
      await this.prisma.detailization.update({where:{id:message.id},data:{state:status}})
    }
  }

  async sendMessage(mobile_phone: string, message: string, crm_key?: string) {
    if (env.IS_MAIN) {
      const clientCrm = await this.prisma.clientCrm.findFirst({
        where: { key: crm_key },
      });

      return await this.prisma.detailization.create({
        data: {
          message,
          phone_number: mobile_phone,
          clientId: clientCrm?.clientId,
          crmId: clientCrm?.id,
        },
      });
    } else if (this.featureFlagService.isActive('sms')) {
      const { data } = await this.axios.post('/sms/send', {
        mobile_phone,
        message,
      });

      return data;
    } else {
      throw new HttpError({
        statusCode: '403',
        message: 'Sms is not enabled',
        code: 'SMS_NOT_ENABLED',
      });
    }
  }

  async getMessages(dto: FindAllSmsQueryDto, crm_key?: string) {
    const { limit = 10, page = 1, message } = dto;
    if (env.IS_MAIN) {
      const where: Prisma.DetailizationWhereInput = {
        isDeleted: false,
      };
      if (message) {
        where.message = {
          contains: message.trim(),
          mode: 'insensitive',
        };
      }

      if (crm_key) {
        where.crm = { key: crm_key };
      }

      const [data, total] = await this.prisma.$transaction([
        this.prisma.detailization.findMany({
          where,
          skip: (page - 1) * limit,
          take: limit,
          include: {
            client: true,
            crm: true,
          },
          orderBy: {
            id: 'desc',
          },
        }),
        this.prisma.detailization.count({ where }),
      ]);

      return {
        total,
        page,
        limit,
        data,
      };
    } else if (this.featureFlagService.isActive('sms')) {
      const { data } = await this.axios.get('/sms/send', {
        params: { ...dto },
      });

      return data;
    } else {
      throw new HttpError({
        statusCode: '403',
        message: 'Sms is not enabled',
        code: 'SMS_NOT_ENABLED',
      });
    }
  }
}
