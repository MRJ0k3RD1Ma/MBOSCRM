import { PaidOtherService } from './paid-other.service';
import { CreatePaidOtherDto } from './dto/create-paid-other.dto';
import { UpdatePaidOtherDto } from './dto/update-paid-other.dto';
import { FindAllQueryPaidOtherDto } from './dto/findAll-query-paid-other.dto';
export declare class PaidOtherController {
    private readonly paidOtherService;
    constructor(paidOtherService: PaidOtherService);
    create(createPaidOtherDto: CreatePaidOtherDto): Promise<{
        type: import(".prisma/client").$Enums.PaidOtherType;
        description: string | null;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        registerId: number | null;
        modifyId: number | null;
        groupId: number;
        price: number;
        paidDate: Date;
        paymentId: number;
    }>;
    findAll(dto: FindAllQueryPaidOtherDto): Promise<({
        Payment: {
            name: string | null;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            registerId: number | null;
            modifyId: number | null;
            icon: string | null;
        };
        group: {
            name: string;
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            registerId: number | null;
            modifyId: number | null;
        };
    } & {
        type: import(".prisma/client").$Enums.PaidOtherType;
        description: string | null;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        registerId: number | null;
        modifyId: number | null;
        groupId: number;
        price: number;
        paidDate: Date;
        paymentId: number;
    })[]>;
    findOne(id: string): Promise<{
        Payment: {
            name: string | null;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            registerId: number | null;
            modifyId: number | null;
            icon: string | null;
        };
        group: {
            name: string;
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            registerId: number | null;
            modifyId: number | null;
        };
    } & {
        type: import(".prisma/client").$Enums.PaidOtherType;
        description: string | null;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        registerId: number | null;
        modifyId: number | null;
        groupId: number;
        price: number;
        paidDate: Date;
        paymentId: number;
    }>;
    update(id: string, updatePaidOtherDto: UpdatePaidOtherDto): Promise<{
        type: import(".prisma/client").$Enums.PaidOtherType;
        description: string | null;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        registerId: number | null;
        modifyId: number | null;
        groupId: number;
        price: number;
        paidDate: Date;
        paymentId: number;
    }>;
    remove(id: string): Promise<{
        type: import(".prisma/client").$Enums.PaidOtherType;
        description: string | null;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        registerId: number | null;
        modifyId: number | null;
        groupId: number;
        price: number;
        paidDate: Date;
        paymentId: number;
    }>;
}
