import { PrismaService } from "../prisma/prisma.service";
import { CreatePaidSupplierDto } from "./dto/create-paid-supplier.dto";
import { FindAllPaidSupplierQueryDto } from "./dto/findAll-paid-supplier.dto";
import { UpdatePaidSupplierDto } from "./dto/update-paid-supplier.dto";
export declare class PaidSupplierService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    onModuleInit(): Promise<void>;
    create(createPaidSupplierDto: CreatePaidSupplierDto, creatorId: number): Promise<{
        id: number;
        price: number | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        paymentId: number | null;
        paidDate: Date | null;
        supplierId: number | null;
    }>;
    findAll(dto: FindAllPaidSupplierQueryDto): Promise<{
        total: number;
        price: number;
        page: number;
        limit: number;
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
            modify: {
                id: number;
                name: string;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                phone: string | null;
                username: string;
                password: string;
                roleId: number | null;
                chatId: string | null;
            };
            register: {
                id: number;
                name: string;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                phone: string | null;
                username: string;
                password: string;
                roleId: number | null;
                chatId: string | null;
            };
        } & {
            id: number;
            price: number | null;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            registerId: number | null;
            modifyId: number | null;
            paymentId: number | null;
            paidDate: Date | null;
            supplierId: number | null;
        })[];
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
        modify: {
            id: number;
            name: string;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            phone: string | null;
            username: string;
            password: string;
            roleId: number | null;
            chatId: string | null;
        };
        register: {
            id: number;
            name: string;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            phone: string | null;
            username: string;
            password: string;
            roleId: number | null;
            chatId: string | null;
        };
    } & {
        id: number;
        price: number | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        paymentId: number | null;
        paidDate: Date | null;
        supplierId: number | null;
    }>;
    update(id: number, dto: UpdatePaidSupplierDto): Promise<{
        id: number;
        price: number | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        paymentId: number | null;
        paidDate: Date | null;
        supplierId: number | null;
    }>;
    remove(id: number, modifierId: number): Promise<{
        id: number;
        price: number | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        paymentId: number | null;
        paidDate: Date | null;
        supplierId: number | null;
    }>;
}
