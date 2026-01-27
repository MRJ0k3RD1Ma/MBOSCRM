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
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        balance: number;
        clientId: number;
        productId: number;
        key: string;
        domain: string | null;
        isFullAccess: boolean;
        expiredFullAccess: Date | null;
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
                id: number;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
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
            id: number;
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
            balance: number;
            clientId: number;
            productId: number;
            key: string;
            domain: string | null;
            isFullAccess: boolean;
            expiredFullAccess: Date | null;
        })[];
    }>;
    findOne(id: number): Promise<{
        client: {
            description: string | null;
            name: string;
            phone: string;
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
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
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        balance: number;
        clientId: number;
        productId: number;
        key: string;
        domain: string | null;
        isFullAccess: boolean;
        expiredFullAccess: Date | null;
    }>;
    update(id: number, dto: UpdateClientCrmDto): Promise<{
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        balance: number;
        clientId: number;
        productId: number;
        key: string;
        domain: string | null;
        isFullAccess: boolean;
        expiredFullAccess: Date | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        balance: number;
        clientId: number;
        productId: number;
        key: string;
        domain: string | null;
        isFullAccess: boolean;
        expiredFullAccess: Date | null;
    }>;
}
