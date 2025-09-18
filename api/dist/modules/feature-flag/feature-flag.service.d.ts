import { OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
export declare class FeatureFlagService implements OnModuleInit {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private flags;
    onModuleInit(): Promise<void>;
    isActive(key: string): true;
    loadFlags(): Promise<void>;
}
