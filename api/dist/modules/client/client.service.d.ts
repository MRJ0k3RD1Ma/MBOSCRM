import { OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { FindAllClientQueryDto } from './dto/findAll-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
export declare class ClientService implements OnModuleInit {
    private readonly prisma;
    constructor(prisma: PrismaService);
    recalculate(clientId: number): Promise<void>;
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
        totals: {
            subscribe: number;
            device: number;
            service: number;
            price: number;
            credit: any;
            monthCredit: any;
            saleCredit: any;
            subscribeCredit: any;
        };
        page: number;
        limit: number;
        data: any[];
    }>;
    findOne(id: number): Promise<any>;
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
