import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { Role } from 'src/common/auth/roles/role.enum';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get()
  @DecoratorWrapper('Get Statistics', true, [Role.Admin])
  findOne(@Query('year', ParseIntPipe) year?: number) {
    return this.statisticsService.getStatistics(year);
  }
}
