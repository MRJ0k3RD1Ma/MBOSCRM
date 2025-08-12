import { PaidServerService } from './paid-server.service';
import { CreatePaidServerDto } from './dto/create-paid-server.dto';
import { UpdatePaidServerDto } from './dto/update-paid-server.dto';
import { FindAllQueryPaidServerDto } from './dto/findAll-query-paid-server.dto';
export declare class PaidServerController {
    private readonly paidServerService;
    constructor(paidServerService: PaidServerService);
    create(createPaidServerDto: CreatePaidServerDto): Promise<{
        id: number;
        serverId: number;
        endDate: Date;
        paymentTypeId: number;
        price: number;
        description: string;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
    }>;
    findAll(dto: FindAllQueryPaidServerDto): Promise<({
        paymentType: {
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
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
        id: number;
        serverId: number;
        endDate: Date;
        paymentTypeId: number;
        price: number;
        description: string;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
    })[]>;
    findOne(id: string): Promise<{
        paymentType: {
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
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
        id: number;
        serverId: number;
        endDate: Date;
        paymentTypeId: number;
        price: number;
        description: string;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
    }>;
    update(id: string, updatePaidServerDto: UpdatePaidServerDto): Promise<{
        id: number;
        serverId: number;
        endDate: Date;
        paymentTypeId: number;
        price: number;
        description: string;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
    }>;
    remove(id: string): Promise<{
        id: number;
        serverId: number;
        endDate: Date;
        paymentTypeId: number;
        price: number;
        description: string;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
    }>;
}
