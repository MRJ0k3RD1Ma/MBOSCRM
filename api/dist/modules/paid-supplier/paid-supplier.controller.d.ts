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
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        price: number | null;
        paymentId: number | null;
        registerId: number | null;
        modifyId: number | null;
        supplierId: number | null;
        paidDate: Date | null;
    }>;
    findAll(query: FindAllPaidSupplierQueryDto): Promise<{
        total: number;
        price: number;
        page: number;
        limit: number;
        data: ({
            register: {
                name: string;
                phone: string | null;
                username: string;
                roleId: number | null;
                chatId: string | null;
                password: string;
                id: number;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
            };
            modify: {
                name: string;
                phone: string | null;
                username: string;
                roleId: number | null;
                chatId: string | null;
                password: string;
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
            price: number | null;
            paymentId: number | null;
            registerId: number | null;
            modifyId: number | null;
            supplierId: number | null;
            paidDate: Date | null;
        })[];
    }>;
    findOne(id: string): Promise<{
        register: {
            name: string;
            phone: string | null;
            username: string;
            roleId: number | null;
            chatId: string | null;
            password: string;
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
        };
        modify: {
            name: string;
            phone: string | null;
            username: string;
            roleId: number | null;
            chatId: string | null;
            password: string;
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
        price: number | null;
        paymentId: number | null;
        registerId: number | null;
        modifyId: number | null;
        supplierId: number | null;
        paidDate: Date | null;
    }>;
    update(id: string, updatePaidSupplierDto: UpdatePaidSupplierDto): Promise<{
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        price: number | null;
        paymentId: number | null;
        registerId: number | null;
        modifyId: number | null;
        supplierId: number | null;
        paidDate: Date | null;
    }>;
    remove(id: string, req: Request): Promise<any>;
}
