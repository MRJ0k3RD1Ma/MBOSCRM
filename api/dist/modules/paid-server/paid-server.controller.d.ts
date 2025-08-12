import { PaidServerService } from './paid-server.service';
import { CreatePaidServerDto } from './dto/create-paid-server.dto';
import { UpdatePaidServerDto } from './dto/update-paid-server.dto';
import { FindAllQueryPaidServerDto } from './dto/findAll-query-paid-server.dto';
export declare class PaidServerController {
    private readonly paidServerService;
    constructor(paidServerService: PaidServerService);
    create(createPaidServerDto: CreatePaidServerDto): Promise<{
        description: string;
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        price: number;
        serverId: number;
        paymentTypeId: number;
        endDate: Date;
    }>;
    findAll(dto: FindAllQueryPaidServerDto): Promise<({
        server: {
            name: string;
            id: number;
        };
        paymentType: {
            name: string | null;
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            registerId: number | null;
            modifyId: number | null;
            icon: string | null;
        };
    } & {
        description: string;
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        price: number;
        serverId: number;
        paymentTypeId: number;
        endDate: Date;
    })[]>;
    findOne(id: string): Promise<{
        server: {
            name: string;
            id: number;
        };
        paymentType: {
            name: string | null;
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            registerId: number | null;
            modifyId: number | null;
            icon: string | null;
        };
    } & {
        description: string;
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        price: number;
        serverId: number;
        paymentTypeId: number;
        endDate: Date;
    }>;
    update(id: string, updatePaidServerDto: UpdatePaidServerDto): Promise<{
        description: string;
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        price: number;
        serverId: number;
        paymentTypeId: number;
        endDate: Date;
    }>;
    remove(id: string): Promise<{
        description: string;
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        price: number;
        serverId: number;
        paymentTypeId: number;
        endDate: Date;
    }>;
}
