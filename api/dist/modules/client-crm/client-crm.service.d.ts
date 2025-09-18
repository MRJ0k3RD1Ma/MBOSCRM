import { OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientCrmDto } from './dto/create-client-crm.dto';
import { FindAllClientCrmQueryDto } from './dto/findAll-client-crm.dto';
import { UpdateClientCrmDto } from './dto/update-client-crm.dto';
export declare class ClientCrmService implements OnModuleInit {
    private readonly prisma;
    constructor(prisma: PrismaService);
    onModuleInit(): Promise<void>;
    create(createClientCrmDto: CreateClientCrmDto): Promise<{
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        balance: number;
        clientId: number;
        productId: number;
        domain: string | null;
        isFullAccess: boolean;
        expiredFullAccess: Date | null;
        key: string;
    }>;
    findAll(dto: FindAllClientCrmQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: ({
            client: {
                description: string | null;
                name: string;
                phone: string;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                balance: number;
                inn: string;
                address: string | null;
                regionId: number | null;
                districtId: number | null;
                typeId: number | null;
                registerId: number | null;
                modifyId: number | null;
            };
        } & {
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            balance: number;
            clientId: number;
            productId: number;
            domain: string | null;
            isFullAccess: boolean;
            expiredFullAccess: Date | null;
            key: string;
        })[];
    }>;
    findOne(id: number): Promise<{
        client: {
            description: string | null;
            name: string;
            phone: string;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            balance: number;
            inn: string;
            address: string | null;
            regionId: number | null;
            districtId: number | null;
            typeId: number | null;
            registerId: number | null;
            modifyId: number | null;
        };
    } & {
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        balance: number;
        clientId: number;
        productId: number;
        domain: string | null;
        isFullAccess: boolean;
        expiredFullAccess: Date | null;
        key: string;
    }>;
    update(id: number, dto: UpdateClientCrmDto): Promise<{
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        balance: number;
        clientId: number;
        productId: number;
        domain: string | null;
        isFullAccess: boolean;
        expiredFullAccess: Date | null;
        key: string;
    }>;
    remove(id: number): Promise<{
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        balance: number;
        clientId: number;
        productId: number;
        domain: string | null;
        isFullAccess: boolean;
        expiredFullAccess: Date | null;
        key: string;
    }>;
}
