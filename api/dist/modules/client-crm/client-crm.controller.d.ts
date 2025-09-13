import { ClientCrmService } from './client-crm.service';
import { CreateClientCrmDto } from './dto/create-client-crm.dto';
import { FindAllClientCrmQueryDto } from './dto/findAll-client-crm.dto';
import { UpdateClientCrmDto } from './dto/update-client-crm.dto';
export declare class ClientCrmController {
    private readonly clientCrmService;
    constructor(clientCrmService: ClientCrmService);
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
    findAll(query: FindAllClientCrmQueryDto): Promise<{
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
    findOne(id: string): Promise<{
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
    update(id: string, updateClientCrmDto: UpdateClientCrmDto): Promise<{
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
    remove(id: string): Promise<{
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
