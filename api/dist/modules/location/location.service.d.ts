import { OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
export declare class LocationService implements OnModuleInit {
    private readonly prisma;
    constructor(prisma: PrismaService);
    onModuleInit(): Promise<void>;
    getRegions(): Promise<{
        id: number;
        name: string | null;
    }[]>;
    getDistricts(regionId: number): Promise<{
        id: number;
        name: string | null;
        regionId: number | null;
    }[]>;
}
