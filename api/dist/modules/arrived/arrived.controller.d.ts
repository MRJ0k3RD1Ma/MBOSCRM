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
        registerId: number | null;
        modifyId: number | null;
        date: Date | null;
        code: string | null;
        codeId: number | null;
        waybillNumber: string | null;
        supplierId: number;
        description: string | null;
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
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                phone: string | null;
                username: string;
                password: string;
                roleId: number | null;
                chatId: string | null;
            };
            ArrivedProduct: {
                id: number;
                arrivedId: number | null;
                productId: number | null;
                count: number;
                price: number | null;
                priceCount: number | null;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                registerId: number | null;
                modifyId: number | null;
            }[];
            supplier: {
                id: number;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                registerId: number | null;
                modifyId: number | null;
                name: string;
                description: string | null;
                phone: string;
                phoneTwo: string | null;
                balance: number;
            };
        } & {
            id: number;
            price: number;
            isDeleted: boolean | null;
            registerId: number | null;
            modifyId: number | null;
            date: Date | null;
            code: string | null;
            codeId: number | null;
            waybillNumber: string | null;
            supplierId: number;
            description: string | null;
            created: Date;
            updated: Date;
        })[];
    }>;
    findOne(id: string): Promise<{
        register: {
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            phone: string | null;
            username: string;
            password: string;
            roleId: number | null;
            chatId: string | null;
        };
        ArrivedProduct: {
            id: number;
            arrivedId: number | null;
            productId: number | null;
            count: number;
            price: number | null;
            priceCount: number | null;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            registerId: number | null;
            modifyId: number | null;
        }[];
        supplier: {
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            registerId: number | null;
            modifyId: number | null;
            name: string;
            description: string | null;
            phone: string;
            phoneTwo: string | null;
            balance: number;
        };
    } & {
        id: number;
        price: number;
        isDeleted: boolean | null;
        registerId: number | null;
        modifyId: number | null;
        date: Date | null;
        code: string | null;
        codeId: number | null;
        waybillNumber: string | null;
        supplierId: number;
        description: string | null;
        created: Date;
        updated: Date;
    }>;
    update(id: string, updateArrivedDto: UpdateArrivedDto, req: Request): Promise<{
        modify: {
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            phone: string | null;
            username: string;
            password: string;
            roleId: number | null;
            chatId: string | null;
        };
        register: {
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            phone: string | null;
            username: string;
            password: string;
            roleId: number | null;
            chatId: string | null;
        };
        ArrivedProduct: ({
            Product: {
                id: number;
                price: number;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                registerId: number | null;
                modifyId: number | null;
                name: string;
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
            arrivedId: number | null;
            productId: number | null;
            count: number;
            price: number | null;
            priceCount: number | null;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            registerId: number | null;
            modifyId: number | null;
        })[];
        supplier: {
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            registerId: number | null;
            modifyId: number | null;
            name: string;
            description: string | null;
            phone: string;
            phoneTwo: string | null;
            balance: number;
        };
    } & {
        id: number;
        price: number;
        isDeleted: boolean | null;
        registerId: number | null;
        modifyId: number | null;
        date: Date | null;
        code: string | null;
        codeId: number | null;
        waybillNumber: string | null;
        supplierId: number;
        description: string | null;
        created: Date;
        updated: Date;
    }>;
    remove(id: string): Promise<any>;
}
