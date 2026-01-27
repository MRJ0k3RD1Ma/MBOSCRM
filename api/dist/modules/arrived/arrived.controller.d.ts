import { ArrivedService } from './arrived.service';
import { CreateArrivedDto } from './dto/create-arrived.dto';
import { UpdateArrivedDto } from './dto/update-arrived.dto';
import { Request } from 'express';
import { FindAllArrivedQueryDto } from './dto/findAll-arrived-query.dto';
export declare class ArrivedController {
    private readonly arrivedService;
    constructor(arrivedService: ArrivedService);
    create(createArrivedDto: CreateArrivedDto, req: Request): Promise<{
        description: string | null;
        id: number;
        isDeleted: boolean | null;
        price: number;
        registerId: number | null;
        modifyId: number | null;
        codeId: number | null;
        date: Date | null;
        code: string | null;
        supplierId: number;
        waybillNumber: string | null;
        created: Date;
        updated: Date;
    }>;
    findAll(dto: FindAllArrivedQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: ({
            supplier: {
                description: string | null;
                name: string;
                phone: string;
                id: number;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                balance: number;
                registerId: number | null;
                modifyId: number | null;
                phoneTwo: string | null;
            };
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
            ArrivedProduct: {
                id: number;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                count: number;
                price: number | null;
                registerId: number | null;
                modifyId: number | null;
                priceCount: number | null;
                productId: number | null;
                arrivedId: number | null;
            }[];
        } & {
            description: string | null;
            id: number;
            isDeleted: boolean | null;
            price: number;
            registerId: number | null;
            modifyId: number | null;
            codeId: number | null;
            date: Date | null;
            code: string | null;
            supplierId: number;
            waybillNumber: string | null;
            created: Date;
            updated: Date;
        })[];
    }>;
    findOne(id: string): Promise<{
        supplier: {
            description: string | null;
            name: string;
            phone: string;
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            balance: number;
            registerId: number | null;
            modifyId: number | null;
            phoneTwo: string | null;
        };
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
        ArrivedProduct: {
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            count: number;
            price: number | null;
            registerId: number | null;
            modifyId: number | null;
            priceCount: number | null;
            productId: number | null;
            arrivedId: number | null;
        }[];
    } & {
        description: string | null;
        id: number;
        isDeleted: boolean | null;
        price: number;
        registerId: number | null;
        modifyId: number | null;
        codeId: number | null;
        date: Date | null;
        code: string | null;
        supplierId: number;
        waybillNumber: string | null;
        created: Date;
        updated: Date;
    }>;
    update(id: string, updateArrivedDto: UpdateArrivedDto, req: Request): Promise<{
        supplier: {
            description: string | null;
            name: string;
            phone: string;
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            balance: number;
            registerId: number | null;
            modifyId: number | null;
            phoneTwo: string | null;
        };
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
        ArrivedProduct: ({
            Product: {
                type: import(".prisma/client").$Enums.ProductType;
                name: string;
                id: number;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                price: number;
                registerId: number | null;
                modifyId: number | null;
                barcode: string | null;
                barcodeId: number | null;
                groupId: number;
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
            count: number;
            price: number | null;
            registerId: number | null;
            modifyId: number | null;
            priceCount: number | null;
            productId: number | null;
            arrivedId: number | null;
        })[];
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
    } & {
        description: string | null;
        id: number;
        isDeleted: boolean | null;
        price: number;
        registerId: number | null;
        modifyId: number | null;
        codeId: number | null;
        date: Date | null;
        code: string | null;
        supplierId: number;
        waybillNumber: string | null;
        created: Date;
        updated: Date;
    }>;
    remove(id: string): Promise<any>;
}
