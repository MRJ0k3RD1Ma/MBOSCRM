import { CreatePaidCrmDto } from './dto/create-paid-crm.dto';
import { UpdatePaidCrmDto } from './dto/update-paid-crm.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllQueryPaidCrmDto } from './dto/findAll-query-paid-crm.dto';
export declare class PaidCrmService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createPaidCrmDto: CreatePaidCrmDto): Promise<{
        price: number;
        paidDate: Date;
        transactionId: string | null;
        state: string | null;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        crmId: number;
        paymentId: number;
        clientId: number;
    }>;
    findAll(dto: FindAllQueryPaidCrmDto): Promise<{
        data: {
            price: number;
            paidDate: Date;
            transactionId: string | null;
            state: string | null;
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            crmId: number;
            paymentId: number;
            clientId: number;
        }[];
        page: number;
        limit: number;
        total: number;
        price: number;
    }>;
    findOne(id: number): Promise<{} & {
        price: number;
        paidDate: Date;
        transactionId: string | null;
        state: string | null;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        crmId: number;
        paymentId: number;
        clientId: number;
    }>;
    update(id: number, updatePaidCrmDto: UpdatePaidCrmDto): Promise<{
        price: number;
        paidDate: Date;
        transactionId: string | null;
        state: string | null;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        crmId: number;
        paymentId: number;
        clientId: number;
    }>;
    remove(id: number): Promise<{
        price: number;
        paidDate: Date;
        transactionId: string | null;
        state: string | null;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        crmId: number;
        paymentId: number;
        clientId: number;
    }>;
}
