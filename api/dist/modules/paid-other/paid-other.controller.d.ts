import { PaidOtherService } from './paid-other.service';
import { CreatePaidOtherDto } from './dto/create-paid-other.dto';
import { UpdatePaidOtherDto } from './dto/update-paid-other.dto';
import { FindAllQueryPaidOtherDto } from './dto/findAll-query-paid-other.dto';
export declare class PaidOtherController {
    private readonly paidOtherService;
    constructor(paidOtherService: PaidOtherService);
    create(createPaidOtherDto: CreatePaidOtherDto): Promise<{
        id: number;
        price: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        registerId: number | null;
        modifyId: number | null;
        paymentId: number;
        paidDate: Date;
        groupId: number;
        type: import(".prisma/client").$Enums.PaidOtherType;
    }>;
    findAll(dto: FindAllQueryPaidOtherDto): Promise<{
        data: ({
            Payment: {
                id: number;
                name: string | null;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                registerId: number | null;
                modifyId: number | null;
                icon: string | null;
            };
            group: {
                id: number;
                name: string;
                isDeleted: boolean;
                createdAt: Date;
                updatedAt: Date;
                registerId: number | null;
                modifyId: number | null;
            };
        } & {
            id: number;
            price: number;
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            registerId: number | null;
            modifyId: number | null;
            paymentId: number;
            paidDate: Date;
            groupId: number;
            type: import(".prisma/client").$Enums.PaidOtherType;
        })[];
        page: number;
        limit: number;
        total: number;
        price: number;
    }>;
    findOne(id: string): Promise<{
        Payment: {
            id: number;
            name: string | null;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            registerId: number | null;
            modifyId: number | null;
            icon: string | null;
        };
        group: {
            id: number;
            name: string;
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
            registerId: number | null;
            modifyId: number | null;
        };
    } & {
        id: number;
        price: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        registerId: number | null;
        modifyId: number | null;
        paymentId: number;
        paidDate: Date;
        groupId: number;
        type: import(".prisma/client").$Enums.PaidOtherType;
    }>;
    update(id: string, updatePaidOtherDto: UpdatePaidOtherDto): Promise<{
        id: number;
        price: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        registerId: number | null;
        modifyId: number | null;
        paymentId: number;
        paidDate: Date;
        groupId: number;
        type: import(".prisma/client").$Enums.PaidOtherType;
    }>;
    remove(id: string): Promise<{
        id: number;
        price: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        registerId: number | null;
        modifyId: number | null;
        paymentId: number;
        paidDate: Date;
        groupId: number;
        type: import(".prisma/client").$Enums.PaidOtherType;
    }>;
}
