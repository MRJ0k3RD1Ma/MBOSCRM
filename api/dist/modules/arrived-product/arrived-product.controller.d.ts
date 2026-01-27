import { ArrivedProductService } from './arrived-product.service';
import { CreateArrivedProductDto } from './dto/create-arrived-product.dto';
import { FindAllArrivedProductQueryDto } from './dto/findAll-arrived-product-query.dto';
import { UpdateArrivedProductDto } from './dto/update-arrived-product.dto';
import { Request } from 'express';
export declare class ArrivedProductController {
    private readonly arrivedproductService;
    constructor(arrivedproductService: ArrivedProductService);
    create(createArrivedProductDto: CreateArrivedProductDto, req: Request): Promise<{
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
    }>;
    findAll(dto: FindAllArrivedProductQueryDto): Promise<{
        total: number;
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
            Product: {
                ProductUnit: {
                    name: string;
                    id: number;
                    isDeleted: boolean | null;
                    createdAt: Date;
                    updatedAt: Date;
                    registerId: number | null;
                    modifyId: number | null;
                };
            } & {
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
            Arrived: {
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
    }>;
    findOne(id: string): Promise<{
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
    }>;
    update(id: string, updateArrivedProductDto: UpdateArrivedProductDto): Promise<any>;
    remove(id: string): Promise<any>;
}
