import { Controller, Get } from '@nestjs/common';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { Role } from 'src/common/auth/roles/role.enum';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get()
  @DecoratorWrapper('Get Statistics', true, [Role.Admin])
  findOne() {
    return this.statisticsService.getStatistics();
  }
}
