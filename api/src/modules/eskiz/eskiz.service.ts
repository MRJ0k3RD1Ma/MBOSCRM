import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import Axios from 'axios';
import { env } from 'src/common/config';
import { DetailizationState, Prisma } from '@prisma/client';
import { EskizCallbackDto } from './dtos/eskiz-callback.dto';

@Injectable()
export class EskizService implements OnModuleInit {
  private axios = Axios.create({ baseURL: 'https://notify.eskiz.uz/api/' });

  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    await this.getToken();

    this.axios.interceptors.response.use(
      (res) => res,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            await this.getToken();

            return await this.axios(originalRequest);
          } catch (refreshError) {
            console.error('Failed to refresh token:', refreshError);
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      },
    );
  }

  async callback(dto: EskizCallbackDto) {
    console.log(dto);
    await this.prisma.detailization.update({
      where: { messageId: dto.message_id },
      data: { state: dto.status as DetailizationState },
    });
    return true;
  }

  async sendMessage(
    message: Awaited<ReturnType<typeof this.prisma.detailization.findFirst>>,
  ) {
    try {
      const callback_url: string = `${env.BACKEND_URL}/eskiz/callback`;
      const { data } = await this.axios.post('message/sms/send', {
        mobile_phone: message.phone_number,
        message: message.message,
        callback_url,
      });

      await this.prisma.detailization.update({
        where: { id: message.id },
        data: { messageId: data.id, state: 'WAITING' },
      });

      return data;
    } catch (e) {
      console.log(e);

      await this.prisma.detailization.update({
        where: { id: message.id },
        data: { state: 'REJECTED' },
      });
      throw e;
    }
  }

  async getTemplates() {
    return (await this.axios.get('/user/templates')).data;
  }

  private async getToken() {
    try {
      const form = new FormData();
      form.append('email', env.ESKIZ_EMAIL);
      form.append('password', env.ESKIZ_PASSWORD);
      const { data } = await this.axios.post('/auth/login', form);

      this.axios.defaults.headers.common['Authorization'] =
        `Bearer ${data.data.token}`;
    } catch (e) {
      console.log(e);
    }
  }
}
