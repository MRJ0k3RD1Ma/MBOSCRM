import { CreateSaleProductDto } from './dto/create-sale-product.dto';
import { UpdateSaleProductDto } from './dto/update-sale-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllSaleProductQueryDto } from './dto/findAll-sale-product-query.dto';
export declare class SaleProductService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createSaleProductDto: CreateSaleProductDto, creatorId: number): Promise<{
        product: {
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
    } & {
        isDeleted: boolean | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        id: number;
        registerId: number | null;
        modifyId: number | null;
        price: number | null;
        productId: number | null;
        count: number | null;
        priceCount: number | null;
        saleId: number | null;
        is_subscribe: boolean | null;
    }>;
    findAll(dto: FindAllSaleProductQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: ({
            product: {
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
            sale: {
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                registerId: number | null;
                modifyId: number | null;
                price: number;
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
            modify: {
                name: string;
                phone: string | null;
                username: string;
                roleId: number | null;
                chatId: string | null;
                password: string;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                id: number;
            };
            register: {
                name: string;
                phone: string | null;
                username: string;
                roleId: number | null;
                chatId: string | null;
                password: string;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                id: number;
            };
        } & {
            isDeleted: boolean | null;
            createdAt: Date | null;
            updatedAt: Date | null;
            id: number;
            registerId: number | null;
            modifyId: number | null;
            price: number | null;
            productId: number | null;
            count: number | null;
            priceCount: number | null;
            saleId: number | null;
            is_subscribe: boolean | null;
        })[];
    }>;
    findOne(id: number): Promise<{
        product: {
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
    } & {
        isDeleted: boolean | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        id: number;
        registerId: number | null;
        modifyId: number | null;
        price: number | null;
        productId: number | null;
        count: number | null;
        priceCount: number | null;
        saleId: number | null;
        is_subscribe: boolean | null;
    }>;
    update(id: number, updateSaleProductDto: UpdateSaleProductDto, modifyId: number): Promise<{
        isDeleted: boolean | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        id: number;
        registerId: number | null;
        modifyId: number | null;
        price: number | null;
        productId: number | null;
        count: number | null;
        priceCount: number | null;
        saleId: number | null;
        is_subscribe: boolean | null;
    }>;
    remove(id: number, modifyId: number): Promise<{
        isDeleted: boolean | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        id: number;
        registerId: number | null;
        modifyId: number | null;
        price: number | null;
        productId: number | null;
        count: number | null;
        priceCount: number | null;
        saleId: number | null;
        is_subscribe: boolean | null;
    }>;
}
