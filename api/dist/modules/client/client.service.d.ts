import { OnModuleInit } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateClientDto } from "./dto/create-client.dto";
import { FindAllClientQueryDto } from "./dto/findAll-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";
export declare class ClientService implements OnModuleInit {
    private readonly prisma;
    constructor(prisma: PrismaService);
    onModuleInit(): Promise<void>;
    create(createClientDto: CreateClientDto, creatorId: number): Promise<{
        id: number;
        name: string;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        description: string | null;
        balance: number;
        typeId: number | null;
        inn: string;
        regionId: number | null;
        districtId: number | null;
        address: string | null;
        phone: string;
    }>;
    findAll(dto: FindAllClientQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: ({
            ClientType: {
                id: number;
                name: string;
            };
        } & {
            id: number;
            name: string;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            registerId: number | null;
            modifyId: number | null;
            description: string | null;
            balance: number;
            typeId: number | null;
            inn: string;
            regionId: number | null;
            districtId: number | null;
            address: string | null;
            phone: string;
        })[];
    }>;
    findOne(id: number): Promise<{
        District: {
            id: number;
            name: string | null;
            regionId: number | null;
        };
        Region: {
            id: number;
            name: string | null;
        };
        ClientType: {
            id: number;
            name: string;
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
            modifyId: number | null;
            creatorId: number | null;
        };
    } & {
        id: number;
        name: string;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        description: string | null;
        balance: number;
        typeId: number | null;
        inn: string;
        regionId: number | null;
        districtId: number | null;
        address: string | null;
        phone: string;
    }>;
    update(id: number, dto: UpdateClientDto, creatorId: number): Promise<{
        id: number;
        name: string;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        description: string | null;
        balance: number;
        typeId: number | null;
        inn: string;
        regionId: number | null;
        districtId: number | null;
        address: string | null;
        phone: string;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        description: string | null;
        balance: number;
        typeId: number | null;
        inn: string;
        regionId: number | null;
        districtId: number | null;
        address: string | null;
        phone: string;
    }>;
}
