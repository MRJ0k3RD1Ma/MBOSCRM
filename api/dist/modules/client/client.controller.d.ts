import { ClientService } from './client.service';
import { FindAllClientQueryDto } from './dto/findAll-client.dto';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Request } from 'express';
export declare class ClientController {
    private readonly clientService;
    constructor(clientService: ClientService);
    create(createClientDto: CreateClientDto, req: Request): Promise<{
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
    findAll(query: FindAllClientQueryDto): Promise<{
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
    findOne(id: string): Promise<{
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
    update(id: string, updateClientDto: UpdateClientDto, req: Request): Promise<{
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
    remove(id: string): Promise<{
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
