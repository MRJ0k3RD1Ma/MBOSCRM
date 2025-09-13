import { PaidSupplierService } from './paid-supplier.service';
import { FindAllPaidSupplierQueryDto } from './dto/findAll-paid-supplier.dto';
import { CreatePaidSupplierDto } from './dto/create-paid-supplier.dto';
import { UpdatePaidSupplierDto } from './dto/update-paid-supplier.dto';
import { Request } from 'express';
export declare class PaidSupplierController {
    private readonly paidsupplierService;
    constructor(paidsupplierService: PaidSupplierService);
    create(createPaidSupplierDto: CreatePaidSupplierDto, req: Request): Promise<{
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
    findAll(query: FindAllPaidSupplierQueryDto): Promise<{
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
    findOne(id: string): Promise<{
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
    update(id: string, updatePaidSupplierDto: UpdatePaidSupplierDto): Promise<{
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
    remove(id: string, req: Request): Promise<{
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
