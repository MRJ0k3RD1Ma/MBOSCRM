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
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        clientId: number;
        productId: number;
        domain: string | null;
        isFullAccess: boolean;
        expiredFullAccess: Date | null;
        balance: number;
        key: string;
    }>;
    findAll(dto: FindAllClientCrmQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: ({
            client: {
                id: number;
                name: string;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                balance: number;
                typeId: number | null;
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
            id: number;
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
            clientId: number;
            productId: number;
            domain: string | null;
            isFullAccess: boolean;
            expiredFullAccess: Date | null;
            balance: number;
            key: string;
        })[];
    }>;
    findOne(id: number): Promise<{
        client: {
            id: number;
            name: string;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            balance: number;
            typeId: number | null;
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
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        clientId: number;
        productId: number;
        domain: string | null;
        isFullAccess: boolean;
        expiredFullAccess: Date | null;
        balance: number;
        key: string;
    }>;
    update(id: number, dto: UpdateClientCrmDto): Promise<{
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        clientId: number;
        productId: number;
        domain: string | null;
        isFullAccess: boolean;
        expiredFullAccess: Date | null;
        balance: number;
        key: string;
    }>;
    remove(id: number): Promise<{
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        clientId: number;
        productId: number;
        domain: string | null;
        isFullAccess: boolean;
        expiredFullAccess: Date | null;
        balance: number;
        key: string;
    }>;
}
