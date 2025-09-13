import { OnModuleInit } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { EskizCallbackDto } from "./dtos/eskiz-callback.dto";
export declare class EskizService implements OnModuleInit {
    private readonly prisma;
    private axios;
    constructor(prisma: PrismaService);
    onModuleInit(): Promise<void>;
<<<<<<< Updated upstream
    callback(dto: EskizCallbackDto): Promise<boolean>;
    sendMessage(message: Awaited<ReturnType<typeof this.prisma.detailization.findFirst>>): Promise<any>;
    getTemplates(): Promise<any>;
=======
    sendMessage(mobile_phone: string, message: string, from?: string, callback_url?: string): Promise<any>;
    getTemplates(): Promise<import("axios").AxiosResponse<any, any, {}>>;
>>>>>>> Stashed changes
    private getToken;
}
