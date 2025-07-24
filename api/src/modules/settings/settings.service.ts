import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Setting } from '@prisma/client';

@Injectable()
export class SettingsService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  onModuleInit() {
    let settings = this.prisma.setting.findFirst({ where: { id: 1 } });
    if (!settings) {
      settings = this.prisma.setting.create({
        data: { id: 1, name: 'default' },
      });
    }
  }

  get() {
    const settings = this.prisma.setting.findFirst({ where: { id: 1 } });
    return settings;
  }

  update(data: Setting) {
    return this.prisma.setting.update({ where: { id: 1 }, data: { ...data } });
  }
}
