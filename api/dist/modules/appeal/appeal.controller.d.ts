import { AppealService } from './appeal.service';
import { CreateAppealDto } from './dto/create-appeal.dto';
import { UpdateAppealDto } from './dto/update-appeal.dto';
import { FindAllAppealDto } from './dto/findAll-appeal.dto';
import { Request } from 'express';
export declare class AppealController {
    private readonly appealService;
    constructor(appealService: AppealService);
    create(createAppealDto: CreateAppealDto): Promise<{
        name: string;
        phone: string;
        subject: string;
        detail: string;
        state: import(".prisma/client").$Enums.AppealState;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        modifyId: number | null;
    }>;
    findAll(dto: FindAllAppealDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: {
            name: string;
            phone: string;
            subject: string;
            detail: string;
            state: import(".prisma/client").$Enums.AppealState;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            modifyId: number | null;
        }[];
    }>;
    findOne(id: string): Promise<{
        name: string;
        phone: string;
        subject: string;
        detail: string;
        state: import(".prisma/client").$Enums.AppealState;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        modifyId: number | null;
    }>;
    update(id: string, updateAppealDto: UpdateAppealDto, req: Request): Promise<{
        name: string;
        phone: string;
        subject: string;
        detail: string;
        state: import(".prisma/client").$Enums.AppealState;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        modifyId: number | null;
    }>;
    remove(id: string): Promise<{
        name: string;
        phone: string;
        subject: string;
        detail: string;
        state: import(".prisma/client").$Enums.AppealState;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        modifyId: number | null;
    }>;
}
