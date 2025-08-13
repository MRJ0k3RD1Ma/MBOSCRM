import { PrismaService } from "../prisma/prisma.service";
import { CreatePaidSupplierDto } from "./dto/create-paid-supplier.dto";
import { FindAllPaidSupplierQueryDto } from "./dto/findAll-paid-supplier.dto";
import { UpdatePaidSupplierDto } from "./dto/update-paid-supplier.dto";
export declare class PaidSupplierService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    onModuleInit(): Promise<void>;
    create(createPaidSupplierDto: CreatePaidSupplierDto, creatorId: number): Promise<{
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
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
                phone: string | null;
                username: string;
                roleId: number | null;
                chatId: string | null;
                password: string;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                id: number;
            };
            register: {
                name: string;
                phone: string | null;
                username: string;
                roleId: number | null;
                chatId: string | null;
                password: string;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                id: number;
            };
            Payment: {
                name: string | null;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                registerId: number | null;
                modifyId: number | null;
                icon: string | null;
            };
        } & {
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
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
            phone: string | null;
            username: string;
            roleId: number | null;
            chatId: string | null;
            password: string;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
        };
        register: {
            name: string;
            phone: string | null;
            username: string;
            roleId: number | null;
            chatId: string | null;
            password: string;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
        };
        Payment: {
            name: string | null;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            registerId: number | null;
            modifyId: number | null;
            icon: string | null;
        };
    } & {
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        registerId: number | null;
        modifyId: number | null;
        price: number | null;
        supplierId: number | null;
        paidDate: Date | null;
        paymentId: number | null;
    }>;
    update(id: number, dto: UpdatePaidSupplierDto): Promise<{
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        registerId: number | null;
        modifyId: number | null;
        price: number | null;
        supplierId: number | null;
        paidDate: Date | null;
        paymentId: number | null;
    }>;
    remove(id: number, modifierId: number): Promise<{
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        registerId: number | null;
        modifyId: number | null;
        price: number | null;
        supplierId: number | null;
        paidDate: Date | null;
        paymentId: number | null;
    }>;
}
