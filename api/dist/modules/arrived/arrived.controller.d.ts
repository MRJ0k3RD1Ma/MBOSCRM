import { ArrivedService } from './arrived.service';
import { CreateArrivedDto } from './dto/create-arrived.dto';
import { UpdateArrivedDto } from './dto/update-arrived.dto';
import { Request } from 'express';
import { FindAllArrivedQueryDto } from './dto/findAll-arrived-query.dto';
export declare class ArrivedController {
    private readonly arrivedService;
    constructor(arrivedService: ArrivedService);
    create(createArrivedDto: CreateArrivedDto, req: Request): Promise<{
        date: Date | null;
        code: string | null;
        codeId: number | null;
        waybillNumber: string | null;
        description: string | null;
        price: number;
        isDeleted: boolean | null;
        created: Date;
        updated: Date;
        id: number;
        supplierId: number;
        registerId: number | null;
        modifyId: number | null;
    }>;
    findAll(dto: FindAllArrivedQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: ({
            register: {
                isDeleted: boolean | null;
                id: number;
                name: string;
                username: string;
                password: string;
                phone: string | null;
                roleId: number | null;
                createdAt: Date;
                updatedAt: Date;
                chatId: string | null;
            };
            supplier: {
                description: string | null;
                isDeleted: boolean | null;
                id: number;
                registerId: number | null;
                modifyId: number | null;
                name: string;
                phone: string;
                createdAt: Date;
                updatedAt: Date;
                phoneTwo: string | null;
                balance: number;
            };
            ArrivedProduct: {
                price: number | null;
                isDeleted: boolean | null;
                id: number;
                registerId: number | null;
                modifyId: number | null;
                createdAt: Date;
                updatedAt: Date;
                arrivedId: number | null;
                productId: number | null;
                count: number;
                priceCount: number | null;
            }[];
        } & {
            date: Date | null;
            code: string | null;
            codeId: number | null;
            waybillNumber: string | null;
            description: string | null;
            price: number;
            isDeleted: boolean | null;
            created: Date;
            updated: Date;
            id: number;
            supplierId: number;
            registerId: number | null;
            modifyId: number | null;
        })[];
    }>;
    findOne(id: string): Promise<{
        register: {
            isDeleted: boolean | null;
            id: number;
            name: string;
            username: string;
            password: string;
            phone: string | null;
            roleId: number | null;
            createdAt: Date;
            updatedAt: Date;
            chatId: string | null;
        };
        supplier: {
            description: string | null;
            isDeleted: boolean | null;
            id: number;
            registerId: number | null;
            modifyId: number | null;
            name: string;
            phone: string;
            createdAt: Date;
            updatedAt: Date;
            phoneTwo: string | null;
            balance: number;
        };
        ArrivedProduct: {
            price: number | null;
            isDeleted: boolean | null;
            id: number;
            registerId: number | null;
            modifyId: number | null;
            createdAt: Date;
            updatedAt: Date;
            arrivedId: number | null;
            productId: number | null;
            count: number;
            priceCount: number | null;
        }[];
    } & {
        date: Date | null;
        code: string | null;
        codeId: number | null;
        waybillNumber: string | null;
        description: string | null;
        price: number;
        isDeleted: boolean | null;
        created: Date;
        updated: Date;
        id: number;
        supplierId: number;
        registerId: number | null;
        modifyId: number | null;
    }>;
    update(id: string, updateArrivedDto: UpdateArrivedDto, req: Request): Promise<{
        modify: {
            isDeleted: boolean | null;
            id: number;
            name: string;
            username: string;
            password: string;
            phone: string | null;
            roleId: number | null;
            createdAt: Date;
            updatedAt: Date;
            chatId: string | null;
        };
        register: {
            isDeleted: boolean | null;
            id: number;
            name: string;
            username: string;
            password: string;
            phone: string | null;
            roleId: number | null;
            createdAt: Date;
            updatedAt: Date;
            chatId: string | null;
        };
        supplier: {
            description: string | null;
            isDeleted: boolean | null;
            id: number;
            registerId: number | null;
            modifyId: number | null;
            name: string;
            phone: string;
            createdAt: Date;
            updatedAt: Date;
            phoneTwo: string | null;
            balance: number;
        };
        ArrivedProduct: ({
            Product: {
                price: number;
                isDeleted: boolean | null;
                id: number;
                registerId: number | null;
                modifyId: number | null;
                name: string;
                createdAt: Date;
                updatedAt: Date;
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
            price: number | null;
            isDeleted: boolean | null;
            id: number;
            registerId: number | null;
            modifyId: number | null;
            createdAt: Date;
            updatedAt: Date;
            arrivedId: number | null;
            productId: number | null;
            count: number;
            priceCount: number | null;
        })[];
    } & {
        date: Date | null;
        code: string | null;
        codeId: number | null;
        waybillNumber: string | null;
        description: string | null;
        price: number;
        isDeleted: boolean | null;
        created: Date;
        updated: Date;
        id: number;
        supplierId: number;
        registerId: number | null;
        modifyId: number | null;
    }>;
    remove(id: string): Promise<any>;
}
