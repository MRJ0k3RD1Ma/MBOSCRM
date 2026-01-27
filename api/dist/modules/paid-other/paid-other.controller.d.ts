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
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        paymentId: number;
        registerId: number | null;
        modifyId: number | null;
        groupId: number;
        paidDate: Date;
    }>;
    findAll(dto: FindAllQueryPaidOtherDto): Promise<{
        data: ({
            Payment: {
                name: string | null;
                id: number;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                registerId: number | null;
                modifyId: number | null;
                icon: string | null;
            };
            group: {
                name: string;
                id: number;
                isDeleted: boolean;
                createdAt: Date;
                updatedAt: Date;
                registerId: number | null;
                modifyId: number | null;
            };
        } & {
            type: import(".prisma/client").$Enums.PaidOtherType;
            description: string | null;
            id: number;
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
            price: number;
            paymentId: number;
            registerId: number | null;
            modifyId: number | null;
            groupId: number;
            paidDate: Date;
        })[];
        page: number;
        limit: number;
        total: number;
        price: number;
    }>;
    findOne(id: string): Promise<{
        Payment: {
            name: string | null;
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            registerId: number | null;
            modifyId: number | null;
            icon: string | null;
        };
        group: {
            name: string;
            id: number;
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
            registerId: number | null;
            modifyId: number | null;
        };
    } & {
        type: import(".prisma/client").$Enums.PaidOtherType;
        description: string | null;
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        paymentId: number;
        registerId: number | null;
        modifyId: number | null;
        groupId: number;
        paidDate: Date;
    }>;
    update(id: string, updatePaidOtherDto: UpdatePaidOtherDto): Promise<{
        type: import(".prisma/client").$Enums.PaidOtherType;
        description: string | null;
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        paymentId: number;
        registerId: number | null;
        modifyId: number | null;
        groupId: number;
        paidDate: Date;
    }>;
    remove(id: string): Promise<{
        type: import(".prisma/client").$Enums.PaidOtherType;
        description: string | null;
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        paymentId: number;
        registerId: number | null;
        modifyId: number | null;
        groupId: number;
        paidDate: Date;
    }>;
}
