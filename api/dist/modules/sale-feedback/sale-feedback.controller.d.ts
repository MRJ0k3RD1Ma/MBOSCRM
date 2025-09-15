import { SaleFeedbackService } from './sale-feedback.service';
import { CreateSaleFeedbackDto } from './dto/create-sale-feedback.dto';
import { UpdateSaleFeedbackDto } from './dto/update-sale-feedback.dto';
import { FindAllSaleFeedbackDto } from './dto/findAll-sale-feedback.dto';
export declare class SaleFeedbackController {
    private readonly saleFeedbackService;
    constructor(saleFeedbackService: SaleFeedbackService);
    create(createSaleFeedbackDto: CreateSaleFeedbackDto): Promise<{
        result: import(".prisma/client").$Enums.SaleFeedbackResult | null;
        id: number;
        name: string | null;
        state: import(".prisma/client").$Enums.SaleFeedbackState;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        saleId: number;
        alias: string;
        score: number | null;
    }>;
    findAll(dto: FindAllSaleFeedbackDto): Promise<{
        data: {
            result: import(".prisma/client").$Enums.SaleFeedbackResult | null;
            id: number;
            name: string | null;
            state: import(".prisma/client").$Enums.SaleFeedbackState;
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            saleId: number;
            alias: string;
            score: number | null;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<{
        result: import(".prisma/client").$Enums.SaleFeedbackResult | null;
        id: number;
        name: string | null;
        state: import(".prisma/client").$Enums.SaleFeedbackState;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        saleId: number;
        alias: string;
        score: number | null;
    }>;
    update(alias: string, updateSaleFeedbackDto: UpdateSaleFeedbackDto): Promise<{
        result: import(".prisma/client").$Enums.SaleFeedbackResult | null;
        id: number;
        name: string | null;
        state: import(".prisma/client").$Enums.SaleFeedbackState;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        saleId: number;
        alias: string;
        score: number | null;
    }>;
    remove(id: string): Promise<{
        result: import(".prisma/client").$Enums.SaleFeedbackResult | null;
        id: number;
        name: string | null;
        state: import(".prisma/client").$Enums.SaleFeedbackState;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        saleId: number;
        alias: string;
        score: number | null;
    }>;
}
