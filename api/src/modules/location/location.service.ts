import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { main as addDistrict } from './data/district';
import { main as addRegion } from './data/region';

@Injectable()
export class LocationService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    if ((await this.prisma.region.count({})) == 0) {
      await addRegion(this.prisma);
      await addDistrict(this.prisma);
    }
  }

  async getRegions() {
    const regions = await this.prisma.region.findMany({});
    return regions;
  }

  async getDistricts(regionId: number) {
    const districts = await this.prisma.district.findMany({
      where: { regionId },
    });
    return districts;
  }
}
