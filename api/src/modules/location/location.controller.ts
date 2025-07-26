import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('region')
  async getRegions() {
    return this.locationService.getRegions();
  }

  @Get('district/:regionId')
  async getDistricts(@Param('regionId', ParseIntPipe) regionId: number) {
    return this.locationService.getDistricts(regionId);
  }
}
