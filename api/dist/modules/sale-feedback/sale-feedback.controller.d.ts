import { SaleFeedbackService } from './sale-feedback.service';
import { CreateSaleFeedbackDto } from './dto/create-sale-feedback.dto';
import { UpdateSaleFeedbackDto, UpdateStateDto } from './dto/update-sale-feedback.dto';
import { FindAllSaleFeedbackDto } from './dto/findAll-sale-feedback.dto';
export declare class SaleFeedbackController {
    private readonly saleFeedbackService;
    constructor(saleFeedbackService: SaleFeedbackService);
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
    findOneSaleFeedback(alias: string): Promise<{
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
    remove(id: string): Promise<{
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
