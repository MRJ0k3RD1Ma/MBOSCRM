import { PaidCrmService } from './paid-crm.service';
import { CreatePaidCrmDto } from './dto/create-paid-crm.dto';
import { UpdatePaidCrmDto } from './dto/update-paid-crm.dto';
import { FindAllQueryPaidCrmDto } from './dto/findAll-query-paid-crm.dto';
export declare class PaidCrmController {
    private readonly paidCrmService;
    constructor(paidCrmService: PaidCrmService);
    create(createPaidCrmDto: CreatePaidCrmDto): Promise<{
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
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
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
            id: number;
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
    findOne(id: string): Promise<{} & {
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        price: number;
        clientId: number;
        paymentId: number;
        state: string | null;
        paidDate: Date;
        crmId: number;
        transactionId: string | null;
    }>;
    update(id: string, updatePaidCrmDto: UpdatePaidCrmDto): Promise<{
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        price: number;
        clientId: number;
        paymentId: number;
        state: string | null;
        paidDate: Date;
        crmId: number;
        transactionId: string | null;
    }>;
    remove(id: string): Promise<{
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        price: number;
        clientId: number;
        paymentId: number;
        state: string | null;
        paidDate: Date;
        crmId: number;
        transactionId: string | null;
    }>;
}
