import { CreatePaidOtherDto } from './dto/create-paid-other.dto';
import { UpdatePaidOtherDto } from './dto/update-paid-other.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllQueryPaidOtherDto } from './dto/findAll-query-paid-other.dto';
export declare class PaidOtherService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createPaidOtherDto: CreatePaidOtherDto): Promise<{
        type: import(".prisma/client").$Enums.PaidOtherType;
        description: string | null;
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
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
        registerId: number | null;
        modifyId: number | null;
        groupId: number;
        price: number;
        paidDate: Date;
        paymentId: number;
    })[]>;
    findOne(id: number): Promise<{
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
        registerId: number | null;
        modifyId: number | null;
        groupId: number;
        price: number;
        paidDate: Date;
        paymentId: number;
    }>;
    update(id: number, updatePaidOtherDto: UpdatePaidOtherDto): Promise<{
        type: import(".prisma/client").$Enums.PaidOtherType;
        description: string | null;
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        groupId: number;
        price: number;
        paidDate: Date;
        paymentId: number;
    }>;
    remove(id: number): Promise<{
        type: import(".prisma/client").$Enums.PaidOtherType;
        description: string | null;
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        groupId: number;
        price: number;
        paidDate: Date;
        paymentId: number;
    }>;
}
