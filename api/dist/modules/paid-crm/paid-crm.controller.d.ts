import { PaidCrmService } from './paid-crm.service';
import { CreatePaidCrmDto } from './dto/create-paid-crm.dto';
import { UpdatePaidCrmDto } from './dto/update-paid-crm.dto';
import { FindAllQueryPaidCrmDto } from './dto/findAll-query-paid-crm.dto';
export declare class PaidCrmController {
    private readonly paidCrmService;
    constructor(paidCrmService: PaidCrmService);
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
    findOne(id: string): Promise<{} & {
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
    update(id: string, updatePaidCrmDto: UpdatePaidCrmDto): Promise<{
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
    remove(id: string): Promise<{
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
