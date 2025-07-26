import { Body, Controller, Get, Patch } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { Setting } from '@prisma/client';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { Role } from 'src/common/auth/roles/role.enum';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  @DecoratorWrapper('Get Settings', true, [Role.Admin])
  async get() {
    return this.settingsService.get();
  }

  @Patch()
  @DecoratorWrapper('update Settings', true, [Role.Admin])
  async update(@Body() data: Setting) {
    return this.settingsService.update(data);
  }
}
