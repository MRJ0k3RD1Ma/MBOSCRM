import { CreatePaidOtherDto } from "./dto/create-paid-other.dto";
import { UpdatePaidOtherDto } from "./dto/update-paid-other.dto";
import { PrismaService } from "../prisma/prisma.service";
import { FindAllQueryPaidOtherDto } from "./dto/findAll-query-paid-other.dto";
export declare class PaidOtherService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createPaidOtherDto: CreatePaidOtherDto): Promise<{
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        price: number;
        description: string | null;
        type: import(".prisma/client").$Enums.PaidOtherType;
        groupId: number;
        paidDate: Date;
        paymentId: number;
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
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
            registerId: number | null;
            modifyId: number | null;
            price: number;
            description: string | null;
            type: import(".prisma/client").$Enums.PaidOtherType;
            groupId: number;
            paidDate: Date;
            paymentId: number;
        })[];
        page: number;
        limit: number;
        total: number;
        price: number;
    }>;
    findOne(id: number): Promise<{
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
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        price: number;
        description: string | null;
        type: import(".prisma/client").$Enums.PaidOtherType;
        groupId: number;
        paidDate: Date;
        paymentId: number;
    }>;
    update(id: number, updatePaidOtherDto: UpdatePaidOtherDto): Promise<{
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        price: number;
        description: string | null;
        type: import(".prisma/client").$Enums.PaidOtherType;
        groupId: number;
        paidDate: Date;
        paymentId: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        price: number;
        description: string | null;
        type: import(".prisma/client").$Enums.PaidOtherType;
        groupId: number;
        paidDate: Date;
        paymentId: number;
    }>;
}
