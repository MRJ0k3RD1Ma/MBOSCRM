import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllPaymentQueryDto } from './dto/findAll-payment-query.dto';
export declare class PaymentService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    onModuleInit(): Promise<void>;
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
    findOne(id: number): Promise<{
        name: string | null;
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        icon: string | null;
    }>;
    update(id: number, updatePaymentDto: UpdatePaymentDto): Promise<{
        name: string | null;
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        icon: string | null;
    }>;
    remove(id: number): Promise<{
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
