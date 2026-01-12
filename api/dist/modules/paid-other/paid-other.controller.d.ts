import { PaidOtherService } from './paid-other.service';
import { CreatePaidOtherDto } from './dto/create-paid-other.dto';
import { UpdatePaidOtherDto } from './dto/update-paid-other.dto';
import { FindAllQueryPaidOtherDto } from './dto/findAll-query-paid-other.dto';
export declare class PaidOtherController {
    private readonly paidOtherService;
    constructor(paidOtherService: PaidOtherService);
    create(createPaidOtherDto: CreatePaidOtherDto): Promise<{
        type: import(".prisma/client").$Enums.PaidOtherType;
        price: number;
        description: string | null;
        paidDate: Date;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        groupId: number;
        registerId: number | null;
        modifyId: number | null;
        paymentId: number;
    }>;
    findAll(dto: FindAllQueryPaidOtherDto): Promise<{
        data: ({
            group: {
                isDeleted: boolean;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                registerId: number | null;
                modifyId: number | null;
                name: string;
            };
            Payment: {
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                registerId: number | null;
                modifyId: number | null;
                name: string | null;
                icon: string | null;
            };
        } & {
            type: import(".prisma/client").$Enums.PaidOtherType;
            price: number;
            description: string | null;
            paidDate: Date;
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            groupId: number;
            registerId: number | null;
            modifyId: number | null;
            paymentId: number;
        })[];
        page: number;
        limit: number;
        total: number;
        price: number;
    }>;
    findOne(id: string): Promise<{
        group: {
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            registerId: number | null;
            modifyId: number | null;
            name: string;
        };
        Payment: {
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            registerId: number | null;
            modifyId: number | null;
            name: string | null;
            icon: string | null;
        };
    } & {
        type: import(".prisma/client").$Enums.PaidOtherType;
        price: number;
        description: string | null;
        paidDate: Date;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        groupId: number;
        registerId: number | null;
        modifyId: number | null;
        paymentId: number;
    }>;
    update(id: string, updatePaidOtherDto: UpdatePaidOtherDto): Promise<{
        type: import(".prisma/client").$Enums.PaidOtherType;
        price: number;
        description: string | null;
        paidDate: Date;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        groupId: number;
        registerId: number | null;
        modifyId: number | null;
        paymentId: number;
    }>;
    remove(id: string): Promise<{
        type: import(".prisma/client").$Enums.PaidOtherType;
        price: number;
        description: string | null;
        paidDate: Date;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        groupId: number;
        registerId: number | null;
        modifyId: number | null;
        paymentId: number;
    }>;
}
