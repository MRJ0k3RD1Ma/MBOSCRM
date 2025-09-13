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
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            registerId: number | null;
            modifyId: number | null;
            price: number;
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
        isDeleted: boolean | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        registerId: number | null;
        modifyId: number | null;
        price: number | null;
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
            sale: {
                id: number;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                registerId: number | null;
                modifyId: number | null;
                date: Date | null;
                code: string | null;
                codeId: number | null;
                clientId: number;
                price: number;
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
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                registerId: number | null;
                modifyId: number | null;
                price: number;
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
            isDeleted: boolean | null;
            createdAt: Date | null;
            updatedAt: Date | null;
            registerId: number | null;
            modifyId: number | null;
            price: number | null;
            saleId: number | null;
            productId: number | null;
            count: number | null;
            priceCount: number | null;
            is_subscribe: boolean | null;
        })[];
    }>;
    findOne(id: number): Promise<{
        product: {
            id: number;
            name: string;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            registerId: number | null;
            modifyId: number | null;
            price: number;
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
        isDeleted: boolean | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        registerId: number | null;
        modifyId: number | null;
        price: number | null;
        saleId: number | null;
        productId: number | null;
        count: number | null;
        priceCount: number | null;
        is_subscribe: boolean | null;
    }>;
    update(id: number, updateSaleProductDto: UpdateSaleProductDto, modifyId: number): Promise<{
        id: number;
        isDeleted: boolean | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        registerId: number | null;
        modifyId: number | null;
        price: number | null;
        saleId: number | null;
        productId: number | null;
        count: number | null;
        priceCount: number | null;
        is_subscribe: boolean | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        isDeleted: boolean | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        registerId: number | null;
        modifyId: number | null;
        price: number | null;
        saleId: number | null;
        productId: number | null;
        count: number | null;
        priceCount: number | null;
        is_subscribe: boolean | null;
    }>;
}
