import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateSettingsDto } from './dto/update-settings.dto';

@Injectable()
export class SettingsService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    let settings = await this.prisma.setting.findFirst({ where: { id: 1 } });
    if (!settings) {
      settings = await this.prisma.setting.create({
        data: { id: 1, name: 'default' },
      });
    }
  }

  get() {
    const settings = this.prisma.setting.findFirst({ where: { id: 1 } });
    return settings;
  }

  update(data: UpdateSettingsDto) {
    return this.prisma.setting.update({ where: { id: 1 }, data: { ...data } });
  }
}
