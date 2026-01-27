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
        description: string | null;
        name: string | null;
        result: import(".prisma/client").$Enums.SaleFeedbackResult | null;
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        saleId: number;
        state: import(".prisma/client").$Enums.SaleFeedbackState;
        alias: string;
        score: number | null;
    }>;
    findAll(dto: FindAllSaleFeedbackDto): Promise<{
        data: {
            description: string | null;
            name: string | null;
            result: import(".prisma/client").$Enums.SaleFeedbackResult | null;
            id: number;
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
            saleId: number;
            state: import(".prisma/client").$Enums.SaleFeedbackState;
            alias: string;
            score: number | null;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: number): Promise<{
        description: string | null;
        name: string | null;
        result: import(".prisma/client").$Enums.SaleFeedbackResult | null;
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        saleId: number;
        state: import(".prisma/client").$Enums.SaleFeedbackState;
        alias: string;
        score: number | null;
    }>;
    findOneByAlias(alias: string): Promise<{
        description: string | null;
        name: string | null;
        result: import(".prisma/client").$Enums.SaleFeedbackResult | null;
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        saleId: number;
        state: import(".prisma/client").$Enums.SaleFeedbackState;
        alias: string;
        score: number | null;
    }>;
    update(alias: string, updateSaleFeedbackDto: UpdateSaleFeedbackDto): Promise<{
        description: string | null;
        name: string | null;
        result: import(".prisma/client").$Enums.SaleFeedbackResult | null;
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        saleId: number;
        state: import(".prisma/client").$Enums.SaleFeedbackState;
        alias: string;
        score: number | null;
    }>;
    updateState(dto: UpdateStateDto, alias: string): Promise<{
        description: string | null;
        name: string | null;
        result: import(".prisma/client").$Enums.SaleFeedbackResult | null;
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        saleId: number;
        state: import(".prisma/client").$Enums.SaleFeedbackState;
        alias: string;
        score: number | null;
    }>;
    remove(id: number): Promise<{
        description: string | null;
        name: string | null;
        result: import(".prisma/client").$Enums.SaleFeedbackResult | null;
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        saleId: number;
        state: import(".prisma/client").$Enums.SaleFeedbackState;
        alias: string;
        score: number | null;
    }>;
}
