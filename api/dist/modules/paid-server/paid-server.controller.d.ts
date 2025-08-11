import { PaidServerService } from './paid-server.service';
import { CreatePaidServerDto } from './dto/create-paid-server.dto';
import { UpdatePaidServerDto } from './dto/update-paid-server.dto';
import { FindAllQueryPaidServerDto } from './dto/findAll-query-paid-server.dto';
export declare class PaidServerController {
    private readonly paidServerService;
    constructor(paidServerService: PaidServerService);
    create(createPaidServerDto: CreatePaidServerDto): Promise<{
        description: string;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        registerId: number | null;
        modifyId: number | null;
        price: number;
        endDate: Date;
        serverId: number;
        paymentTypeId: number;
    }>;
    findAll(dto: FindAllQueryPaidServerDto): Promise<({
        paymentType: {
            name: string | null;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            registerId: number | null;
            modifyId: number | null;
            icon: string | null;
        };
        server: {
            name: string;
            id: number;
        };
    } & {
        description: string;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        registerId: number | null;
        modifyId: number | null;
        price: number;
        endDate: Date;
        serverId: number;
        paymentTypeId: number;
    })[]>;
    findOne(id: string): Promise<{
        paymentType: {
            name: string | null;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            registerId: number | null;
            modifyId: number | null;
            icon: string | null;
        };
        server: {
            name: string;
            id: number;
        };
    } & {
        description: string;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        registerId: number | null;
        modifyId: number | null;
        price: number;
        endDate: Date;
        serverId: number;
        paymentTypeId: number;
    }>;
    update(id: string, updatePaidServerDto: UpdatePaidServerDto): Promise<{
        description: string;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        registerId: number | null;
        modifyId: number | null;
        price: number;
        endDate: Date;
        serverId: number;
        paymentTypeId: number;
    }>;
    remove(id: string): Promise<{
        description: string;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        registerId: number | null;
        modifyId: number | null;
        price: number;
        endDate: Date;
        serverId: number;
        paymentTypeId: number;
    }>;
}
