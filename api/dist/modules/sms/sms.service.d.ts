import { PrismaService } from '../prisma/prisma.service';
import { EskizService } from '../eskiz/eskiz.service';
import { FeatureFlagService } from '../feature-flag/feature-flag.service';
import { FindAllSmsQueryDto } from './dtos/findAll-sms-query.dto';
export declare class SmsService {
    private readonly prisma;
    private readonly featureFlagService;
    private readonly eskizService?;
    constructor(prisma: PrismaService, featureFlagService: FeatureFlagService, eskizService?: EskizService);
    private axios;
    cron(): Promise<void>;
    sendMessage(mobile_phone: string, message: string, crm_key?: string): Promise<any>;
    getMessages(dto: FindAllSmsQueryDto, crm_key?: string): Promise<any>;
}
