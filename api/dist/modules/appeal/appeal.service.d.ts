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
    findOne(id: number): Promise<{
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
    update(id: number, updateAppealDto: UpdateAppealDto, modifyId: number): Promise<{
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
    remove(id: number): Promise<{
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
