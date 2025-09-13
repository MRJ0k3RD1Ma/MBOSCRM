import { PaidServerService } from './paid-server.service';
import { CreatePaidServerDto } from './dto/create-paid-server.dto';
import { UpdatePaidServerDto } from './dto/update-paid-server.dto';
import { FindAllQueryPaidServerDto } from './dto/findAll-query-paid-server.dto';
export declare class PaidServerController {
    private readonly paidServerService;
    constructor(paidServerService: PaidServerService);
    create(createPaidServerDto: CreatePaidServerDto): Promise<{
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        price: number;
        description: string | null;
        serverId: number;
        endDate: Date;
        paymentTypeId: number;
    }>;
    findAll(dto: FindAllQueryPaidServerDto): Promise<{
        data: ({
            server: {
                id: number;
                name: string;
            };
            paymentType: {
                id: number;
                name: string | null;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                registerId: number | null;
                modifyId: number | null;
                icon: string | null;
            };
        } & {
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            registerId: number | null;
            modifyId: number | null;
            price: number;
            description: string | null;
            serverId: number;
            endDate: Date;
            paymentTypeId: number;
        })[];
        page: number;
        limit: number;
        total: number;
        price: number;
    }>;
    findOne(id: string): Promise<{
        server: {
            id: number;
            name: string;
        };
        paymentType: {
            id: number;
            name: string | null;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            registerId: number | null;
            modifyId: number | null;
            icon: string | null;
        };
    } & {
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        price: number;
        description: string | null;
        serverId: number;
        endDate: Date;
        paymentTypeId: number;
    }>;
    update(id: string, updatePaidServerDto: UpdatePaidServerDto): Promise<{
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        price: number;
        description: string | null;
        serverId: number;
        endDate: Date;
        paymentTypeId: number;
    }>;
    remove(id: string): Promise<{
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        price: number;
        description: string | null;
        serverId: number;
        endDate: Date;
        paymentTypeId: number;
    }>;
}
