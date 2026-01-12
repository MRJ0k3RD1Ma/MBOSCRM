import { CreateAppealDto } from './dto/create-appeal.dto';
import { UpdateAppealDto } from './dto/update-appeal.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllAppealDto } from './dto/findAll-appeal.dto';
export declare class AppealService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    findOne(id: number): Promise<{
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
    update(id: number, updateAppealDto: UpdateAppealDto, modifyId: number): Promise<{
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
    remove(id: number): Promise<{
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
