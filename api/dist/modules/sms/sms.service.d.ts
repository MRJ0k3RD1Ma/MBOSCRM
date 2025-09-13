import { PrismaService } from "../prisma/prisma.service";
import { EskizService } from "../eskiz/eskiz.service";
import { FeatureFlagService } from "../feature-flag/feature-flag.service";
export declare class SmsService {
    private readonly prisma;
    private readonly eskizService;
    private readonly featureFlagService;
    constructor(prisma: PrismaService, eskizService: EskizService, featureFlagService: FeatureFlagService);
    private axios;
    cron(): Promise<void>;
    sendMessage(mobile_phone: string, message: string, crm_key?: string): Promise<any>;
}
