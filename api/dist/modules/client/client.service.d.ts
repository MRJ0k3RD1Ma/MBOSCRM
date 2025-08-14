import { OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { FindAllClientQueryDto } from './dto/findAll-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
export declare class ClientService implements OnModuleInit {
    private readonly prisma;
    constructor(prisma: PrismaService);
    onModuleInit(): Promise<void>;
    create(createClientDto: CreateClientDto, creatorId: number): Promise<{
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
    }>;
    findAll(dto: FindAllClientQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: ({
            ClientType: {
                name: string;
                id: number;
            };
        } & {
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
        })[];
    }>;
    findOne(id: number): Promise<{
        District: {
            name: string | null;
            id: number;
            regionId: number | null;
        };
        Region: {
            name: string | null;
            id: number;
        };
        ClientType: {
            name: string;
            id: number;
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
            modifyId: number | null;
            creatorId: number | null;
        };
    } & {
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
    }>;
    update(id: number, dto: UpdateClientDto, creatorId: number): Promise<{
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
    }>;
    remove(id: number): Promise<{
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
    }>;
}
