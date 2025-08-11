import { SupplierService } from './supplier.service';
import { FindAllSupplierQueryDto } from './dto/findAll-supplier.dto';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Request } from 'express';
export declare class SupplierController {
    private readonly supplierService;
    constructor(supplierService: SupplierService);
    create(createSupplierDto: CreateSupplierDto, req: Request): Promise<{
        description: string | null;
        name: string;
        phone: string;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        balance: number;
        registerId: number | null;
        modifyId: number | null;
        phoneTwo: string | null;
    }>;
    findAll(query: FindAllSupplierQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: ({
            modify: {
                name: string;
                username: string;
                password: string;
                phone: string | null;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                chatId: string | null;
                id: number;
                roleId: number | null;
            };
            register: {
                name: string;
                username: string;
                password: string;
                phone: string | null;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                chatId: string | null;
                id: number;
                roleId: number | null;
            };
        } & {
            description: string | null;
            name: string;
            phone: string;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            balance: number;
            registerId: number | null;
            modifyId: number | null;
            phoneTwo: string | null;
        })[];
    }>;
    findOne(id: string): Promise<{
        modify: {
            name: string;
            username: string;
            password: string;
            phone: string | null;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            chatId: string | null;
            id: number;
            roleId: number | null;
        };
        register: {
            name: string;
            username: string;
            password: string;
            phone: string | null;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            chatId: string | null;
            id: number;
            roleId: number | null;
        };
    } & {
        description: string | null;
        name: string;
        phone: string;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        balance: number;
        registerId: number | null;
        modifyId: number | null;
        phoneTwo: string | null;
    }>;
    update(id: string, updateSupplierDto: UpdateSupplierDto, req: Request): Promise<{
        description: string | null;
        name: string;
        phone: string;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        balance: number;
        registerId: number | null;
        modifyId: number | null;
        phoneTwo: string | null;
    }>;
    remove(id: string): Promise<{
        description: string | null;
        name: string;
        phone: string;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        balance: number;
        registerId: number | null;
        modifyId: number | null;
        phoneTwo: string | null;
    }>;
}
