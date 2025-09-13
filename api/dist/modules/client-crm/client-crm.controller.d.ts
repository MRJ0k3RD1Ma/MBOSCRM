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
        clientId: number;
        productId: number;
        domain: string | null;
        isFullAccess: boolean;
        expiredFullAccess: Date | null;
        balance: number;
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
    findOne(id: string): Promise<{
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
    update(id: string, updateClientCrmDto: UpdateClientCrmDto): Promise<{
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
    remove(id: string): Promise<{
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
