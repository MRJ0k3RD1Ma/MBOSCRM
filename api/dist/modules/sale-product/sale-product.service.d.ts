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
        count: number | null;
        price: number | null;
        isDeleted: boolean | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        productId: number | null;
        registerId: number | null;
        modifyId: number | null;
        saleId: number | null;
        priceCount: number | null;
        is_subscribe: boolean | null;
    }>;
    findAll(dto: FindAllSaleProductQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: ({
            product: {
                ProductUnit: {
                    id: number;
                    name: string;
                    isDeleted: boolean | null;
                    createdAt: Date;
                    updatedAt: Date;
                    registerId: number | null;
                    modifyId: number | null;
                };
            } & {
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
            sale: {
                id: number;
                state: import(".prisma/client").$Enums.SaleState;
                price: number;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                clientId: number;
                registerId: number | null;
                modifyId: number | null;
                date: Date | null;
                code: string | null;
                codeId: number | null;
                dept: number;
                credit: number;
                clientName: string | null;
                subscribe_begin_date: Date | null;
                subscribe_generate_day: number | null;
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
            count: number | null;
            price: number | null;
            isDeleted: boolean | null;
            createdAt: Date | null;
            updatedAt: Date | null;
            productId: number | null;
            registerId: number | null;
            modifyId: number | null;
            saleId: number | null;
            priceCount: number | null;
            is_subscribe: boolean | null;
        })[];
    }>;
    findOne(id: number): Promise<{
        product: {
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
        count: number | null;
        price: number | null;
        isDeleted: boolean | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        productId: number | null;
        registerId: number | null;
        modifyId: number | null;
        saleId: number | null;
        priceCount: number | null;
        is_subscribe: boolean | null;
    }>;
    update(id: number, updateSaleProductDto: UpdateSaleProductDto, modifyId: number): Promise<{
        id: number;
        count: number | null;
        price: number | null;
        isDeleted: boolean | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        productId: number | null;
        registerId: number | null;
        modifyId: number | null;
        saleId: number | null;
        priceCount: number | null;
        is_subscribe: boolean | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        count: number | null;
        price: number | null;
        isDeleted: boolean | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        productId: number | null;
        registerId: number | null;
        modifyId: number | null;
        saleId: number | null;
        priceCount: number | null;
        is_subscribe: boolean | null;
    }>;
}
