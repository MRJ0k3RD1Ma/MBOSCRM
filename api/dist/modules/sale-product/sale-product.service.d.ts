import { CreateSaleProductDto } from "./dto/create-sale-product.dto";
import { UpdateSaleProductDto } from "./dto/update-sale-product.dto";
import { PrismaService } from "../prisma/prisma.service";
import { FindAllSaleProductQueryDto } from "./dto/findAll-sale-product-query.dto";
export declare class SaleProductService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createSaleProductDto: CreateSaleProductDto, creatorId: number): Promise<{
        product: {
            id: number;
            price: number;
            registerId: number | null;
            modifyId: number | null;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
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
        saleId: number | null;
        productId: number | null;
        price: number | null;
        count: number | null;
        priceCount: number | null;
        is_subscribe: boolean | null;
        registerId: number | null;
        modifyId: number | null;
        isDeleted: boolean | null;
        createdAt: Date | null;
        updatedAt: Date | null;
    }>;
    findAll(dto: FindAllSaleProductQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: ({
            sale: {
                id: number;
                price: number;
                registerId: number | null;
                modifyId: number | null;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                date: Date | null;
                code: string | null;
                codeId: number | null;
                clientId: number;
                dept: number;
                credit: number;
                state: import(".prisma/client").$Enums.SaleState;
                clientName: string | null;
                subscribe_begin_date: Date | null;
                subscribe_generate_day: number | null;
            };
            product: {
                ProductUnit: {
                    id: number;
                    registerId: number | null;
                    modifyId: number | null;
                    isDeleted: boolean | null;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                };
            } & {
                id: number;
                price: number;
                registerId: number | null;
                modifyId: number | null;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
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
        } & {
            id: number;
            saleId: number | null;
            productId: number | null;
            price: number | null;
            count: number | null;
            priceCount: number | null;
            is_subscribe: boolean | null;
            registerId: number | null;
            modifyId: number | null;
            isDeleted: boolean | null;
            createdAt: Date | null;
            updatedAt: Date | null;
        })[];
    }>;
    findOne(id: number): Promise<{
        product: {
            id: number;
            price: number;
            registerId: number | null;
            modifyId: number | null;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
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
        saleId: number | null;
        productId: number | null;
        price: number | null;
        count: number | null;
        priceCount: number | null;
        is_subscribe: boolean | null;
        registerId: number | null;
        modifyId: number | null;
        isDeleted: boolean | null;
        createdAt: Date | null;
        updatedAt: Date | null;
    }>;
    update(id: number, updateSaleProductDto: UpdateSaleProductDto, modifyId: number): Promise<{
        id: number;
        saleId: number | null;
        productId: number | null;
        price: number | null;
        count: number | null;
        priceCount: number | null;
        is_subscribe: boolean | null;
        registerId: number | null;
        modifyId: number | null;
        isDeleted: boolean | null;
        createdAt: Date | null;
        updatedAt: Date | null;
    }>;
    remove(id: number, modifyId: number): Promise<{
        id: number;
        saleId: number | null;
        productId: number | null;
        price: number | null;
        count: number | null;
        priceCount: number | null;
        is_subscribe: boolean | null;
        registerId: number | null;
        modifyId: number | null;
        isDeleted: boolean | null;
        createdAt: Date | null;
        updatedAt: Date | null;
    }>;
}
