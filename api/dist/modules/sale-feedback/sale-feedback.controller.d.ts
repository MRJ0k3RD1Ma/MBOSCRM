import { SaleFeedbackService } from './sale-feedback.service';
import { CreateSaleFeedbackDto } from './dto/create-sale-feedback.dto';
import { UpdateSaleFeedbackDto } from './dto/update-sale-feedback.dto';
import { FindAllSaleFeedbackDto } from './dto/findAll-sale-feedback.dto';
export declare class SaleFeedbackController {
    private readonly saleFeedbackService;
    constructor(saleFeedbackService: SaleFeedbackService);
    create(createSaleFeedbackDto: CreateSaleFeedbackDto): Promise<{
        description: string | null;
        name: string | null;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        result: import(".prisma/client").$Enums.SaleFeedbackResult | null;
        saleId: number;
        state: import(".prisma/client").$Enums.SaleFeedbackState;
        score: number | null;
        alias: string;
    }>;
    findAll(dto: FindAllSaleFeedbackDto): Promise<{
        data: {
            description: string | null;
            name: string | null;
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            result: import(".prisma/client").$Enums.SaleFeedbackResult | null;
            saleId: number;
            state: import(".prisma/client").$Enums.SaleFeedbackState;
            score: number | null;
            alias: string;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<{
        description: string | null;
        name: string | null;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        result: import(".prisma/client").$Enums.SaleFeedbackResult | null;
        saleId: number;
        state: import(".prisma/client").$Enums.SaleFeedbackState;
        score: number | null;
        alias: string;
    }>;
    update(alias: string, updateSaleFeedbackDto: UpdateSaleFeedbackDto): Promise<{
        description: string | null;
        name: string | null;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        result: import(".prisma/client").$Enums.SaleFeedbackResult | null;
        saleId: number;
        state: import(".prisma/client").$Enums.SaleFeedbackState;
        score: number | null;
        alias: string;
    }>;
    remove(id: string): Promise<{
        description: string | null;
        name: string | null;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        result: import(".prisma/client").$Enums.SaleFeedbackResult | null;
        saleId: number;
        state: import(".prisma/client").$Enums.SaleFeedbackState;
        score: number | null;
        alias: string;
    }>;
}
