import { ArrivedService } from './arrived.service';
import { CreateArrivedDto } from './dto/create-arrived.dto';
import { UpdateArrivedDto } from './dto/update-arrived.dto';
import { Request } from 'express';
import { FindAllArrivedQueryDto } from './dto/findAll-arrived-query.dto';
export declare class ArrivedController {
    private readonly arrivedService;
    constructor(arrivedService: ArrivedService);
    create(createArrivedDto: CreateArrivedDto, req: Request): Promise<{
        id: number;
        isDeleted: boolean | null;
        registerId: number | null;
        modifyId: number | null;
        price: number;
        description: string | null;
        date: Date | null;
        code: string | null;
        codeId: number | null;
        waybillNumber: string | null;
        supplierId: number;
        created: Date;
        updated: Date;
    }>;
    findAll(dto: FindAllArrivedQueryDto): Promise<{
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
            ArrivedProduct: {
                id: number;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                registerId: number | null;
                modifyId: number | null;
                price: number | null;
                count: number;
                productId: number | null;
                priceCount: number | null;
                arrivedId: number | null;
            }[];
            supplier: {
                id: number;
                name: string;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                registerId: number | null;
                modifyId: number | null;
                description: string | null;
                balance: number;
                phone: string;
                phoneTwo: string | null;
            };
        } & {
            id: number;
            isDeleted: boolean | null;
            registerId: number | null;
            modifyId: number | null;
            price: number;
            description: string | null;
            date: Date | null;
            code: string | null;
            codeId: number | null;
            waybillNumber: string | null;
            supplierId: number;
            created: Date;
            updated: Date;
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
        ArrivedProduct: {
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            registerId: number | null;
            modifyId: number | null;
            price: number | null;
            count: number;
            productId: number | null;
            priceCount: number | null;
            arrivedId: number | null;
        }[];
        supplier: {
            id: number;
            name: string;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            registerId: number | null;
            modifyId: number | null;
            description: string | null;
            balance: number;
            phone: string;
            phoneTwo: string | null;
        };
    } & {
        id: number;
        isDeleted: boolean | null;
        registerId: number | null;
        modifyId: number | null;
        price: number;
        description: string | null;
        date: Date | null;
        code: string | null;
        codeId: number | null;
        waybillNumber: string | null;
        supplierId: number;
        created: Date;
        updated: Date;
    }>;
    update(id: string, updateArrivedDto: UpdateArrivedDto, req: Request): Promise<{
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
        ArrivedProduct: ({
            Product: {
                id: number;
                name: string;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                registerId: number | null;
                modifyId: number | null;
                price: number;
                type: import(".prisma/client").$Enums.ProductType;
                groupId: number;
                barcode: string | null;
                barcodeId: number | null;
                unitId: number | null;
                priceIncome: number;
                reminderFirst: number;
                countReminder: number;
                countArrived: number;
                countSale: number;
            };
        } & {
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            registerId: number | null;
            modifyId: number | null;
            price: number | null;
            count: number;
            productId: number | null;
            priceCount: number | null;
            arrivedId: number | null;
        })[];
        supplier: {
            id: number;
            name: string;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            registerId: number | null;
            modifyId: number | null;
            description: string | null;
            balance: number;
            phone: string;
            phoneTwo: string | null;
        };
    } & {
        id: number;
        isDeleted: boolean | null;
        registerId: number | null;
        modifyId: number | null;
        price: number;
        description: string | null;
        date: Date | null;
        code: string | null;
        codeId: number | null;
        waybillNumber: string | null;
        supplierId: number;
        created: Date;
        updated: Date;
    }>;
    remove(id: string): Promise<{
        id: number;
        isDeleted: boolean | null;
        registerId: number | null;
        modifyId: number | null;
        price: number;
        description: string | null;
        date: Date | null;
        code: string | null;
        codeId: number | null;
        waybillNumber: string | null;
        supplierId: number;
        created: Date;
        updated: Date;
    }>;
}
