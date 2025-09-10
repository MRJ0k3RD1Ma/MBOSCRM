import { OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaidOtherGroupDto } from './dto/create-paid-other-group.dto';
import { FindAllPaidOtherGroupQueryDto } from './dto/findAll-paid-other-group.dto';
import { UpdatePaidOtherGroupDto } from './dto/update-paid-other-group.dto';
export declare class PaidOtherGroupService implements OnModuleInit {
    private readonly prisma;
    constructor(prisma: PrismaService);
    onModuleInit(): Promise<void>;
    create(createPaidOtherGroupDto: CreatePaidOtherGroupDto): Promise<{
        name: string;
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
    }>;
    findAll(dto: FindAllPaidOtherGroupQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: {
            name: string;
            id: number;
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
            registerId: number | null;
            modifyId: number | null;
        }[];
    }>;
    findOne(id: number): Promise<{
        name: string;
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
    }>;
    update(id: number, dto: UpdatePaidOtherGroupDto): Promise<{
        name: string;
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
    }>;
    remove(id: number): Promise<{
        name: string;
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
    }>;
}
