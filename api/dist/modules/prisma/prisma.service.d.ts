import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import createSubscriber from 'pg-listen';
export declare class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    subscriber: ReturnType<typeof createSubscriber>;
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
