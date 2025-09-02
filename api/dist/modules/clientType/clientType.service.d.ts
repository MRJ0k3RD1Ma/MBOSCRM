import { OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientTypeDto } from './dto/create-client-type.dto';
import { FindAllClientTypeQueryDto } from './dto/findAll-client-type.dto';
import { UpdateClientTypeDto } from './dto/update-client-type.dto';
export declare class ClientTypeService implements OnModuleInit {
    private readonly prisma;
    constructor(prisma: PrismaService);
    onModuleInit(): Promise<void>;
    create(createClientTypeDto: CreateClientTypeDto): Promise<{
        name: string;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        modifyId: number | null;
        creatorId: number | null;
    }>;
    findAll(dto: FindAllClientTypeQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: {
            name: string;
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            modifyId: number | null;
            creatorId: number | null;
        }[];
    }>;
    findOne(id: number): Promise<{
        name: string;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        modifyId: number | null;
        creatorId: number | null;
    }>;
    update(id: number, dto: UpdateClientTypeDto): Promise<{
        name: string;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        modifyId: number | null;
        creatorId: number | null;
    }>;
    remove(id: number): Promise<{
        name: string;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        modifyId: number | null;
        creatorId: number | null;
    }>;
}
