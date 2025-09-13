import { OnModuleInit } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
export declare class SmsService implements OnModuleInit {
    private readonly prisma;
    constructor(prisma: PrismaService);
    onModuleInit(): Promise<void>;
    sendMessage(mobile_phone: string, message: string, crm_key?: string): Promise<void>;
}
