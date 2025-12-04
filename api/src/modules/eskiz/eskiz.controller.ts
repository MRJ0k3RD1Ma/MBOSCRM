import { Body, Controller, Get, Post } from '@nestjs/common';
import { EskizService } from './eskiz.service';
import { FeatureFlag } from '../feature-flag/feature-flag.decorator';
import { DecoratorWrapper } from '../../common/auth/decorator.auth';
import { Role } from '../../common/auth/roles/role.enum';
import { EskizCallbackDto } from './dtos/eskiz-callback.dto';

@Controller('eskiz')
@FeatureFlag('ESKIZ')
export class EskizController {
  constructor(private readonly eskizService: EskizService) {}

  @Get('templates')
  @DecoratorWrapper('get templates', true, [Role.Admin])
  getTemplates() {
    return this.eskizService.getTemplates();
  }

  
  @Post("callback")
  @DecoratorWrapper('get templates', true, [Role.Admin])
  callback(@Body() dto: EskizCallbackDto) {
    return this.eskizService.callback(dto);
  }
}
