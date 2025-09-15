import { ClientCrmService } from './client-crm.service';
import { CreateClientCrmDto } from './dto/create-client-crm.dto';
import { FindAllClientCrmQueryDto } from './dto/findAll-client-crm.dto';
import { UpdateClientCrmDto } from './dto/update-client-crm.dto';
export declare class ClientCrmController {
    private readonly clientCrmService;
    constructor(clientCrmService: ClientCrmService);
    create(createClientCrmDto: CreateClientCrmDto): Promise<{
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        balance: number;
        productId: number;
        clientId: number;
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
            productId: number;
            clientId: number;
            domain: string | null;
            isFullAccess: boolean;
            expiredFullAccess: Date | null;
            key: string;
        })[];
    }>;
    findOne(id: string): Promise<{
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
        productId: number;
        clientId: number;
        domain: string | null;
        isFullAccess: boolean;
        expiredFullAccess: Date | null;
        key: string;
    }>;
    update(id: string, updateClientCrmDto: UpdateClientCrmDto): Promise<{
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        balance: number;
        productId: number;
        clientId: number;
        domain: string | null;
        isFullAccess: boolean;
        expiredFullAccess: Date | null;
        key: string;
    }>;
    remove(id: string): Promise<{
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        balance: number;
        productId: number;
        clientId: number;
        domain: string | null;
        isFullAccess: boolean;
        expiredFullAccess: Date | null;
        key: string;
    }>;
}
