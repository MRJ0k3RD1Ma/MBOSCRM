import { PaidServerService } from './paid-server.service';
import { CreatePaidServerDto } from './dto/create-paid-server.dto';
import { UpdatePaidServerDto } from './dto/update-paid-server.dto';
import { FindAllQueryPaidServerDto } from './dto/findAll-query-paid-server.dto';
export declare class PaidServerController {
    private readonly paidServerService;
    constructor(paidServerService: PaidServerService);
    create(createPaidServerDto: CreatePaidServerDto): Promise<{
        endDate: Date;
        price: number;
        description: string | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        serverId: number;
        paymentTypeId: number;
        registerId: number | null;
        modifyId: number | null;
    }>;
    findAll(dto: FindAllQueryPaidServerDto): Promise<{
        data: ({
            paymentType: {
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                registerId: number | null;
                modifyId: number | null;
                name: string | null;
                icon: string | null;
            };
            server: {
                id: number;
                name: string;
            };
        } & {
            endDate: Date;
            price: number;
            description: string | null;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            serverId: number;
            paymentTypeId: number;
            registerId: number | null;
            modifyId: number | null;
        })[];
        page: number;
        limit: number;
        total: number;
        price: number;
    }>;
    findOne(id: string): Promise<{
        paymentType: {
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            registerId: number | null;
            modifyId: number | null;
            name: string | null;
            icon: string | null;
        };
        server: {
            id: number;
            name: string;
        };
    } & {
        endDate: Date;
        price: number;
        description: string | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        serverId: number;
        paymentTypeId: number;
        registerId: number | null;
        modifyId: number | null;
    }>;
    update(id: string, updatePaidServerDto: UpdatePaidServerDto): Promise<{
        endDate: Date;
        price: number;
        description: string | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        serverId: number;
        paymentTypeId: number;
        registerId: number | null;
        modifyId: number | null;
    }>;
    remove(id: string): Promise<{
        endDate: Date;
        price: number;
        description: string | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        serverId: number;
        paymentTypeId: number;
        registerId: number | null;
        modifyId: number | null;
    }>;
}
