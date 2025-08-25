import { CreateSaleProductDto } from "./dto/create-sale-product.dto";
import { UpdateSaleProductDto } from "./dto/update-sale-product.dto";
import { PrismaService } from "../prisma/prisma.service";
import { FindAllSaleProductQueryDto } from "./dto/findAll-sale-product-query.dto";
export declare class SaleProductService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createSaleProductDto: CreateSaleProductDto, creatorId: number): Promise<{
        product: {
            price: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
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
        price: number | null;
        isDeleted: boolean | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        id: number;
        registerId: number | null;
        modifyId: number | null;
        saleId: number | null;
        productId: number | null;
        count: number | null;
        priceCount: number | null;
        is_subscribe: boolean | null;
    }>;
    findAll(dto: FindAllSaleProductQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: ({
            register: {
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                name: string;
                phone: string | null;
                username: string;
                password: string;
                roleId: number | null;
                chatId: string | null;
            };
            sale: {
                date: Date | null;
                code: string | null;
                codeId: number | null;
                price: number;
                dept: number;
                credit: number;
                state: import(".prisma/client").$Enums.SaleState;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                clientName: string | null;
                subscribe_begin_date: Date | null;
                subscribe_generate_day: number | null;
                id: number;
                clientId: number;
                registerId: number | null;
                modifyId: number | null;
            };
            product: {
                ProductUnit: {
                    isDeleted: boolean | null;
                    createdAt: Date;
                    updatedAt: Date;
                    id: number;
                    registerId: number | null;
                    modifyId: number | null;
                    name: string;
                };
            } & {
                price: number;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                id: number;
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
            modify: {
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                name: string;
                phone: string | null;
                username: string;
                password: string;
                roleId: number | null;
                chatId: string | null;
            };
        } & {
            price: number | null;
            isDeleted: boolean | null;
            createdAt: Date | null;
            updatedAt: Date | null;
            id: number;
            registerId: number | null;
            modifyId: number | null;
            saleId: number | null;
            productId: number | null;
            count: number | null;
            priceCount: number | null;
            is_subscribe: boolean | null;
        })[];
    }>;
    findOne(id: number): Promise<{
        product: {
            price: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
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
        price: number | null;
        isDeleted: boolean | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        id: number;
        registerId: number | null;
        modifyId: number | null;
        saleId: number | null;
        productId: number | null;
        count: number | null;
        priceCount: number | null;
        is_subscribe: boolean | null;
    }>;
    update(id: number, updateSaleProductDto: UpdateSaleProductDto, modifyId: number): Promise<{
        price: number | null;
        isDeleted: boolean | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        id: number;
        registerId: number | null;
        modifyId: number | null;
        saleId: number | null;
        productId: number | null;
        count: number | null;
        priceCount: number | null;
        is_subscribe: boolean | null;
    }>;
    remove(id: number, modifyId: number): Promise<{
        price: number | null;
        isDeleted: boolean | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        id: number;
        registerId: number | null;
        modifyId: number | null;
        saleId: number | null;
        productId: number | null;
        count: number | null;
        priceCount: number | null;
        is_subscribe: boolean | null;
    }>;
}
