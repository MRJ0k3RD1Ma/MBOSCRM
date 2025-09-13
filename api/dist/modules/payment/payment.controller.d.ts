import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { FindAllPaymentQueryDto } from './dto/findAll-payment-query.dto';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    create(createPaymentDto: CreatePaymentDto): Promise<{
        name: string | null;
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        icon: string | null;
    }>;
    findAll(dto: FindAllPaymentQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: {
            name: string | null;
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            registerId: number | null;
            modifyId: number | null;
            icon: string | null;
        }[];
    }>;
    findOne(id: string): Promise<{
        name: string | null;
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        icon: string | null;
    }>;
    update(id: string, updatePaymentDto: UpdatePaymentDto): Promise<{
        name: string | null;
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        icon: string | null;
    }>;
    remove(id: string): Promise<{
        name: string | null;
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        icon: string | null;
    }>;
}
