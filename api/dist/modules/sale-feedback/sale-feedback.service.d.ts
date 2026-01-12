import { CreateSaleFeedbackDto } from './dto/create-sale-feedback.dto';
import { UpdateSaleFeedbackDto, UpdateStateDto } from './dto/update-sale-feedback.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllSaleFeedbackDto } from './dto/findAll-sale-feedback.dto';
import { SmsService } from '../sms/sms.service';
export declare class SaleFeedbackService {
    private readonly prisma;
    private readonly smsService;
    constructor(prisma: PrismaService, smsService: SmsService);
    create(createSaleFeedbackDto: CreateSaleFeedbackDto): Promise<{
        alias: string;
        name: string | null;
        description: string | null;
        score: number | null;
        state: import(".prisma/client").$Enums.SaleFeedbackState;
        isDeleted: boolean;
        result: import(".prisma/client").$Enums.SaleFeedbackResult | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        saleId: number;
    }>;
    findAll(dto: FindAllSaleFeedbackDto): Promise<{
        data: {
            alias: string;
            name: string | null;
            description: string | null;
            score: number | null;
            state: import(".prisma/client").$Enums.SaleFeedbackState;
            isDeleted: boolean;
            result: import(".prisma/client").$Enums.SaleFeedbackResult | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            saleId: number;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: number): Promise<{
        alias: string;
        name: string | null;
        description: string | null;
        score: number | null;
        state: import(".prisma/client").$Enums.SaleFeedbackState;
        isDeleted: boolean;
        result: import(".prisma/client").$Enums.SaleFeedbackResult | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        saleId: number;
    }>;
    findOneByAlias(alias: string): Promise<{
        alias: string;
        name: string | null;
        description: string | null;
        score: number | null;
        state: import(".prisma/client").$Enums.SaleFeedbackState;
        isDeleted: boolean;
        result: import(".prisma/client").$Enums.SaleFeedbackResult | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        saleId: number;
    }>;
    update(alias: string, updateSaleFeedbackDto: UpdateSaleFeedbackDto): Promise<{
        alias: string;
        name: string | null;
        description: string | null;
        score: number | null;
        state: import(".prisma/client").$Enums.SaleFeedbackState;
        isDeleted: boolean;
        result: import(".prisma/client").$Enums.SaleFeedbackResult | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        saleId: number;
    }>;
    updateState(dto: UpdateStateDto, alias: string): Promise<{
        alias: string;
        name: string | null;
        description: string | null;
        score: number | null;
        state: import(".prisma/client").$Enums.SaleFeedbackState;
        isDeleted: boolean;
        result: import(".prisma/client").$Enums.SaleFeedbackResult | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        saleId: number;
    }>;
    remove(id: number): Promise<{
        alias: string;
        name: string | null;
        description: string | null;
        score: number | null;
        state: import(".prisma/client").$Enums.SaleFeedbackState;
        isDeleted: boolean;
        result: import(".prisma/client").$Enums.SaleFeedbackResult | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        saleId: number;
    }>;
}
