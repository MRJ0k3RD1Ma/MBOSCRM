import { OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
export declare class LocationService implements OnModuleInit {
    private readonly prisma;
    constructor(prisma: PrismaService);
    onModuleInit(): Promise<void>;
    getRegions(): Promise<{
        name: string | null;
        id: number;
    }[]>;
    getDistricts(regionId: number): Promise<{
        name: string | null;
        id: number;
        regionId: number | null;
    }[]>;
}
