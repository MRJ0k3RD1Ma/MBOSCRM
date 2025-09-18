import { Controller, Get } from '@nestjs/common';
import { EskizService } from './eskiz.service';
import { FeatureFlag } from '../feature-flag/feature-flag.decorator';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { Role } from 'src/common/auth/roles/role.enum';

@Controller('eskiz')
@FeatureFlag('ESKIZ')
export class EskizController {
  constructor(private readonly eskizService: EskizService) {}

  @Get('templates')
  @DecoratorWrapper('get templates', true, [Role.Admin])
  getTemplates() {
    return this.eskizService.getTemplates();
  }
}
