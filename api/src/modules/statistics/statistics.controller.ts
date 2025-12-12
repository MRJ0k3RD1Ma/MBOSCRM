import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { DecoratorWrapper } from '../../common/auth/decorator.auth';
import { Role } from '../../common/auth/roles/role.enum';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get()
  @DecoratorWrapper('Get Statistics', false, [Role.Admin])
  findOne(@Query('year', ParseIntPipe) year?: number) {
    return this.statisticsService.getStatistics(year);
  }

  @Get("export")
    @DecoratorWrapper('Export as Excel', false, [Role.Admin])
  export(@Query('year', ParseIntPipe) year?: number,@Query('month',ParseIntPipe) month?:number) {
    return this.statisticsService.export(year,month);
  }

}
