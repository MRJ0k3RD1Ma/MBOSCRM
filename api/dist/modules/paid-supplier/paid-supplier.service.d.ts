import { PrismaService } from '../prisma/prisma.service';
import { CreatePaidSupplierDto } from './dto/create-paid-supplier.dto';
import { FindAllPaidSupplierQueryDto } from './dto/findAll-paid-supplier.dto';
import { UpdatePaidSupplierDto } from './dto/update-paid-supplier.dto';
export declare class PaidSupplierService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    onModuleInit(): Promise<void>;
    create(createPaidSupplierDto: CreatePaidSupplierDto, creatorId: number): Promise<{
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        price: number | null;
        supplierId: number | null;
        paidDate: Date | null;
        paymentId: number | null;
    }>;
    findAll(dto: FindAllPaidSupplierQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: ({
            modify: {
                name: string;
                username: string;
                password: string;
                phone: string | null;
                roleId: number | null;
                chatId: string | null;
                id: number;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
            };
            register: {
                name: string;
                username: string;
                password: string;
                phone: string | null;
                roleId: number | null;
                chatId: string | null;
                id: number;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
            };
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
        } & {
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            registerId: number | null;
            modifyId: number | null;
            price: number | null;
            supplierId: number | null;
            paidDate: Date | null;
            paymentId: number | null;
        })[];
    }>;
    findOne(id: number): Promise<{
        modify: {
            name: string;
            username: string;
            password: string;
            phone: string | null;
            roleId: number | null;
            chatId: string | null;
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
        };
        register: {
            name: string;
            username: string;
            password: string;
            phone: string | null;
            roleId: number | null;
            chatId: string | null;
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
        };
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
    } & {
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        price: number | null;
        supplierId: number | null;
        paidDate: Date | null;
        paymentId: number | null;
    }>;
    update(id: number, dto: UpdatePaidSupplierDto): Promise<{
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        price: number | null;
        supplierId: number | null;
        paidDate: Date | null;
        paymentId: number | null;
    }>;
    remove(id: number, modifierId: number): Promise<{
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        price: number | null;
        supplierId: number | null;
        paidDate: Date | null;
        paymentId: number | null;
    }>;
}
