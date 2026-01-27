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
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        modifyId: number | null;
        state: import(".prisma/client").$Enums.AppealState;
        subject: string;
        detail: string;
    }>;
    findAll(dto: FindAllAppealDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: {
            name: string;
            phone: string;
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            modifyId: number | null;
            state: import(".prisma/client").$Enums.AppealState;
            subject: string;
            detail: string;
        }[];
    }>;
    findOne(id: string): Promise<{
        name: string;
        phone: string;
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        modifyId: number | null;
        state: import(".prisma/client").$Enums.AppealState;
        subject: string;
        detail: string;
    }>;
    update(id: string, updateAppealDto: UpdateAppealDto, req: Request): Promise<{
        name: string;
        phone: string;
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        modifyId: number | null;
        state: import(".prisma/client").$Enums.AppealState;
        subject: string;
        detail: string;
    }>;
    remove(id: string): Promise<{
        name: string;
        phone: string;
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        modifyId: number | null;
        state: import(".prisma/client").$Enums.AppealState;
        subject: string;
        detail: string;
    }>;
}
