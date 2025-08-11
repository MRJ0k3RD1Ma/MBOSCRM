import { PaidOtherService } from './paid-other.service';
import { CreatePaidOtherDto } from './dto/create-paid-other.dto';
import { UpdatePaidOtherDto } from './dto/update-paid-other.dto';
import { FindAllQueryPaidOtherDto } from './dto/findAll-query-paid-other.dto';
export declare class PaidOtherController {
    private readonly paidOtherService;
    constructor(paidOtherService: PaidOtherService);
    create(createPaidOtherDto: CreatePaidOtherDto): Promise<{
        description: string | null;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        registerId: number | null;
        modifyId: number | null;
        price: number;
        type: import(".prisma/client").$Enums.PaidOtherType;
        groupId: number;
        paidDate: Date;
    }>;
    findAll(dto: FindAllQueryPaidOtherDto): Promise<({
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
        description: string | null;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        registerId: number | null;
        modifyId: number | null;
        price: number;
        type: import(".prisma/client").$Enums.PaidOtherType;
        groupId: number;
        paidDate: Date;
    })[]>;
    findOne(id: string): Promise<{
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
        description: string | null;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        registerId: number | null;
        modifyId: number | null;
        price: number;
        type: import(".prisma/client").$Enums.PaidOtherType;
        groupId: number;
        paidDate: Date;
    }>;
    update(id: string, updatePaidOtherDto: UpdatePaidOtherDto): Promise<{
        description: string | null;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        registerId: number | null;
        modifyId: number | null;
        price: number;
        type: import(".prisma/client").$Enums.PaidOtherType;
        groupId: number;
        paidDate: Date;
    }>;
    remove(id: string): Promise<{
        description: string | null;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        registerId: number | null;
        modifyId: number | null;
        price: number;
        type: import(".prisma/client").$Enums.PaidOtherType;
        groupId: number;
        paidDate: Date;
    }>;
}
