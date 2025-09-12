import { ClientService } from './client.service';
import { FindAllClientQueryDto } from './dto/findAll-client.dto';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Request } from 'express';
export declare class ClientController {
    private readonly clientService;
    constructor(clientService: ClientService);
    create(createClientDto: CreateClientDto, req: Request): Promise<{
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
    findAll(query: FindAllClientQueryDto): Promise<{
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
    findOne(id: string): Promise<{
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
    update(id: string, updateClientDto: UpdateClientDto, req: Request): Promise<{
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
    remove(id: string): Promise<{
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
