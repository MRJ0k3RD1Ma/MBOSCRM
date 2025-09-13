import { ClientCrmService } from './client-crm.service';
import { CreateClientCrmDto } from './dto/create-client-crm.dto';
import { FindAllClientCrmQueryDto } from './dto/findAll-client-crm.dto';
import { UpdateClientCrmDto } from './dto/update-client-crm.dto';
export declare class ClientCrmController {
    private readonly clientCrmService;
    constructor(clientCrmService: ClientCrmService);
    create(createClientCrmDto: CreateClientCrmDto): Promise<{
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        clientId: number | null;
        balance: number;
        productId: number | null;
        domain: string | null;
        isFullAccess: boolean;
        expiredFullAccess: Date | null;
        key: string;
    }>;
    findAll(query: FindAllClientCrmQueryDto): Promise<{
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
                registerId: number | null;
                modifyId: number | null;
                typeId: number | null;
                inn: string;
                regionId: number | null;
                districtId: number | null;
                address: string | null;
                balance: number;
                description: string | null;
                phone: string;
            };
        } & {
            id: number;
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
            clientId: number | null;
            balance: number;
            productId: number | null;
            domain: string | null;
            isFullAccess: boolean;
            expiredFullAccess: Date | null;
            key: string;
        })[];
    }>;
    findOne(id: string): Promise<{
        client: {
            id: number;
            name: string;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            registerId: number | null;
            modifyId: number | null;
            typeId: number | null;
            inn: string;
            regionId: number | null;
            districtId: number | null;
            address: string | null;
            balance: number;
            description: string | null;
            phone: string;
        };
    } & {
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        clientId: number | null;
        balance: number;
        productId: number | null;
        domain: string | null;
        isFullAccess: boolean;
        expiredFullAccess: Date | null;
        key: string;
    }>;
    update(id: string, updateClientCrmDto: UpdateClientCrmDto): Promise<{
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        clientId: number | null;
        balance: number;
        productId: number | null;
        domain: string | null;
        isFullAccess: boolean;
        expiredFullAccess: Date | null;
        key: string;
    }>;
    remove(id: string): Promise<{
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        clientId: number | null;
        balance: number;
        productId: number | null;
        domain: string | null;
        isFullAccess: boolean;
        expiredFullAccess: Date | null;
        key: string;
    }>;
}
