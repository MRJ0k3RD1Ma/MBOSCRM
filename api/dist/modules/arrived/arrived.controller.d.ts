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
        price: number;
        isDeleted: boolean | null;
        description: string | null;
        registerId: number | null;
        modifyId: number | null;
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
            ArrivedProduct: {
                id: number;
                count: number;
                price: number | null;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                productId: number | null;
                registerId: number | null;
                modifyId: number | null;
                arrivedId: number | null;
                priceCount: number | null;
            }[];
            supplier: {
                id: number;
                name: string;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                balance: number;
                description: string | null;
                registerId: number | null;
                modifyId: number | null;
                phone: string;
                phoneTwo: string | null;
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
            price: number;
            isDeleted: boolean | null;
            description: string | null;
            registerId: number | null;
            modifyId: number | null;
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
        ArrivedProduct: {
            id: number;
            count: number;
            price: number | null;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            productId: number | null;
            registerId: number | null;
            modifyId: number | null;
            arrivedId: number | null;
            priceCount: number | null;
        }[];
        supplier: {
            id: number;
            name: string;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            balance: number;
            description: string | null;
            registerId: number | null;
            modifyId: number | null;
            phone: string;
            phoneTwo: string | null;
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
        price: number;
        isDeleted: boolean | null;
        description: string | null;
        registerId: number | null;
        modifyId: number | null;
        date: Date | null;
        code: string | null;
        codeId: number | null;
        waybillNumber: string | null;
        supplierId: number;
        created: Date;
        updated: Date;
    }>;
    update(id: string, updateArrivedDto: UpdateArrivedDto, req: Request): Promise<{
        ArrivedProduct: ({
            Product: {
                id: number;
                name: string;
                price: number;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                registerId: number | null;
                modifyId: number | null;
                barcode: string | null;
                barcodeId: number | null;
                groupId: number;
                unitId: number | null;
                priceIncome: number;
                reminderFirst: number;
                type: import(".prisma/client").$Enums.ProductType;
                countReminder: number;
                countArrived: number;
                countSale: number;
            };
        } & {
            id: number;
            count: number;
            price: number | null;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            productId: number | null;
            registerId: number | null;
            modifyId: number | null;
            arrivedId: number | null;
            priceCount: number | null;
        })[];
        supplier: {
            id: number;
            name: string;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            balance: number;
            description: string | null;
            registerId: number | null;
            modifyId: number | null;
            phone: string;
            phoneTwo: string | null;
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
        price: number;
        isDeleted: boolean | null;
        description: string | null;
        registerId: number | null;
        modifyId: number | null;
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
        price: number;
        isDeleted: boolean | null;
        description: string | null;
        registerId: number | null;
        modifyId: number | null;
        date: Date | null;
        code: string | null;
        codeId: number | null;
        waybillNumber: string | null;
        supplierId: number;
        created: Date;
        updated: Date;
    }>;
}
