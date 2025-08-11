import { ArrivedProductService } from './arrived-product.service';
import { CreateArrivedProductDto } from './dto/create-arrived-product.dto';
import { FindAllArrivedProductQueryDto } from './dto/findAll-arrived-product-query.dto';
import { UpdateArrivedProductDto } from './dto/update-arrived-product.dto';
import { Request } from 'express';
export declare class ArrivedProductController {
    private readonly arrivedproductService;
    constructor(arrivedproductService: ArrivedProductService);
    create(createArrivedProductDto: CreateArrivedProductDto, req: Request): Promise<{
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        registerId: number | null;
        modifyId: number | null;
        price: number | null;
        arrivedId: number | null;
        productId: number | null;
        count: number;
        priceCount: number | null;
    }>;
    findAll(dto: FindAllArrivedProductQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: ({
            Product: {
                ProductUnit: {
                    name: string;
                    isDeleted: boolean | null;
                    createdAt: Date;
                    updatedAt: Date;
                    id: number;
                    registerId: number | null;
                    modifyId: number | null;
                };
            } & {
                type: import(".prisma/client").$Enums.ProductType;
                name: string;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                registerId: number | null;
                modifyId: number | null;
                barcode: string | null;
                groupId: number;
                unitId: number | null;
                priceIncome: number;
                reminderFirst: number;
                price: number;
                barcodeId: number | null;
                countReminder: number;
                countArrived: number;
                countSale: number;
            };
            register: {
                name: string;
                username: string;
                password: string;
                phone: string | null;
                roleId: number | null;
                chatId: string | null;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                id: number;
            };
            Arrived: {
                supplier: {
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
                };
            } & {
                description: string | null;
                isDeleted: boolean | null;
                id: number;
                registerId: number | null;
                modifyId: number | null;
                price: number;
                supplierId: number;
                date: Date | null;
                waybillNumber: string | null;
                code: string | null;
                codeId: number | null;
                created: Date;
                updated: Date;
            };
        } & {
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            registerId: number | null;
            modifyId: number | null;
            price: number | null;
            arrivedId: number | null;
            productId: number | null;
            count: number;
            priceCount: number | null;
        })[];
    }>;
    findOne(id: string): Promise<{
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        registerId: number | null;
        modifyId: number | null;
        price: number | null;
        arrivedId: number | null;
        productId: number | null;
        count: number;
        priceCount: number | null;
    }>;
    update(id: string, updateArrivedProductDto: UpdateArrivedProductDto): Promise<{
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        registerId: number | null;
        modifyId: number | null;
        price: number | null;
        arrivedId: number | null;
        productId: number | null;
        count: number;
        priceCount: number | null;
    }>;
    remove(id: string): Promise<{
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        registerId: number | null;
        modifyId: number | null;
        price: number | null;
        arrivedId: number | null;
        productId: number | null;
        count: number;
        priceCount: number | null;
    }>;
}
