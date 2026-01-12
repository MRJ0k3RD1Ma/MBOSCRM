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
        supplierId: number | null;
        paidDate: Date | null;
        price: number | null;
        paymentId: number | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
    }>;
    findAll(query: FindAllPaidSupplierQueryDto): Promise<{
        total: number;
        price: number;
        page: number;
        limit: number;
        data: ({
            modify: {
                id: number;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                username: string;
                password: string;
                phone: string | null;
                roleId: number | null;
                chatId: string | null;
            };
            Payment: {
                id: number;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                registerId: number | null;
                modifyId: number | null;
                name: string | null;
                icon: string | null;
            };
            register: {
                id: number;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                username: string;
                password: string;
                phone: string | null;
                roleId: number | null;
                chatId: string | null;
            };
        } & {
            id: number;
            supplierId: number | null;
            paidDate: Date | null;
            price: number | null;
            paymentId: number | null;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            registerId: number | null;
            modifyId: number | null;
        })[];
    }>;
    findOne(id: string): Promise<{
        modify: {
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            username: string;
            password: string;
            phone: string | null;
            roleId: number | null;
            chatId: string | null;
        };
        Payment: {
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            registerId: number | null;
            modifyId: number | null;
            name: string | null;
            icon: string | null;
        };
        register: {
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            username: string;
            password: string;
            phone: string | null;
            roleId: number | null;
            chatId: string | null;
        };
    } & {
        id: number;
        supplierId: number | null;
        paidDate: Date | null;
        price: number | null;
        paymentId: number | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
    }>;
    update(id: string, updatePaidSupplierDto: UpdatePaidSupplierDto): Promise<{
        id: number;
        supplierId: number | null;
        paidDate: Date | null;
        price: number | null;
        paymentId: number | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
    }>;
    remove(id: string, req: Request): Promise<any>;
}
