import { CreatePaidCrmDto } from './dto/create-paid-crm.dto';
import { UpdatePaidCrmDto } from './dto/update-paid-crm.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllQueryPaidCrmDto } from './dto/findAll-query-paid-crm.dto';
export declare class PaidCrmService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createPaidCrmDto: CreatePaidCrmDto): Promise<{
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        clientId: number;
        paymentId: number;
        state: string | null;
        paidDate: Date;
        crmId: number;
        transactionId: string | null;
    }>;
    findAll(dto: FindAllQueryPaidCrmDto): Promise<{
        data: {
            id: number;
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
            price: number;
            clientId: number;
            paymentId: number;
            state: string | null;
            paidDate: Date;
            crmId: number;
            transactionId: string | null;
        }[];
        page: number;
        limit: number;
        total: number;
        price: number;
    }>;
    findOne(id: number): Promise<{} & {
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        clientId: number;
        paymentId: number;
        state: string | null;
        paidDate: Date;
        crmId: number;
        transactionId: string | null;
    }>;
    update(id: number, updatePaidCrmDto: UpdatePaidCrmDto): Promise<{
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        clientId: number;
        paymentId: number;
        state: string | null;
        paidDate: Date;
        crmId: number;
        transactionId: string | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        clientId: number;
        paymentId: number;
        state: string | null;
        paidDate: Date;
        crmId: number;
        transactionId: string | null;
    }>;
}
