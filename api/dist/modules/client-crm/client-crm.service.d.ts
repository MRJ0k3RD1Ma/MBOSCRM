import { OnModuleInit } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateClientCrmDto } from "./dto/create-client-crm.dto";
import { FindAllClientCrmQueryDto } from "./dto/findAll-client-crm.dto";
import { UpdateClientCrmDto } from "./dto/update-client-crm.dto";
export declare class ClientCrmService implements OnModuleInit {
    private readonly prisma;
    constructor(prisma: PrismaService);
    onModuleInit(): Promise<void>;
    create(createClientCrmDto: CreateClientCrmDto): Promise<{
        domain: string | null;
        isFullAccess: boolean;
        expiredFullAccess: Date | null;
        balance: number;
        key: string;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        clientId: number;
        productId: number;
    }>;
    findAll(dto: FindAllClientCrmQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: ({
            client: {
                balance: number;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                typeId: number | null;
                name: string;
                inn: string;
                regionId: number | null;
                districtId: number | null;
                address: string | null;
                description: string | null;
                registerId: number | null;
                modifyId: number | null;
                phone: string;
            };
        } & {
            domain: string | null;
            isFullAccess: boolean;
            expiredFullAccess: Date | null;
            balance: number;
            key: string;
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            clientId: number;
            productId: number;
        })[];
    }>;
    findOne(id: number): Promise<{
        client: {
            balance: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            typeId: number | null;
            name: string;
            inn: string;
            regionId: number | null;
            districtId: number | null;
            address: string | null;
            description: string | null;
            registerId: number | null;
            modifyId: number | null;
            phone: string;
        };
    } & {
        domain: string | null;
        isFullAccess: boolean;
        expiredFullAccess: Date | null;
        balance: number;
        key: string;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        clientId: number;
        productId: number;
    }>;
    update(id: number, dto: UpdateClientCrmDto): Promise<{
        domain: string | null;
        isFullAccess: boolean;
        expiredFullAccess: Date | null;
        balance: number;
        key: string;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        clientId: number;
        productId: number;
    }>;
    remove(id: number): Promise<{
        domain: string | null;
        isFullAccess: boolean;
        expiredFullAccess: Date | null;
        balance: number;
        key: string;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        clientId: number;
        productId: number;
    }>;
}
