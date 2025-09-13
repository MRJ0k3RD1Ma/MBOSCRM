import { SupplierService } from './supplier.service';
import { FindAllSupplierQueryDto } from './dto/findAll-supplier.dto';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Request } from 'express';
export declare class SupplierController {
    private readonly supplierService;
    constructor(supplierService: SupplierService);
    create(createSupplierDto: CreateSupplierDto, req: Request): Promise<{
        id: number;
        name: string;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        balance: number;
        description: string | null;
        phone: string;
        phoneTwo: string | null;
    }>;
    findAll(query: FindAllSupplierQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: ({
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
        } & {
            id: number;
            name: string;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            registerId: number | null;
            modifyId: number | null;
            balance: number;
            description: string | null;
            phone: string;
            phoneTwo: string | null;
        })[];
    }>;
    findOne(id: string): Promise<{
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
    } & {
        id: number;
        name: string;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        balance: number;
        description: string | null;
        phone: string;
        phoneTwo: string | null;
    }>;
    update(id: string, updateSupplierDto: UpdateSupplierDto, req: Request): Promise<{
        id: number;
        name: string;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        balance: number;
        description: string | null;
        phone: string;
        phoneTwo: string | null;
    }>;
    remove(id: string): Promise<{
        id: number;
        name: string;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        balance: number;
        description: string | null;
        phone: string;
        phoneTwo: string | null;
    }>;
}
