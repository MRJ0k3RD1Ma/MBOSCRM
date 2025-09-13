import { OnModuleInit } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
export declare class EskizService implements OnModuleInit {
    private readonly prisma;
    private axios;
    constructor(prisma: PrismaService);
    onModuleInit(): Promise<void>;
    sendMessage(mobile_phone: string, message: string, from?: string, callback_url?: string): Promise<any>;
    getTemplates(): Promise<import("axios").AxiosResponse<any, any, {}>>;
    private getToken;
}
