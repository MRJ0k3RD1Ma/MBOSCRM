import { Body, Controller, Get, Patch } from '@nestjs/common';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { Role } from 'src/common/auth/roles/role.enum';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { SettingsService } from './settings.service';

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
  async update(@Body() data: UpdateSettingsDto) {
    return this.settingsService.update(data);
  }
}
