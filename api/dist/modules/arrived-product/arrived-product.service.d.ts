import { PrismaService } from "../prisma/prisma.service";
import { CreateArrivedProductDto } from "./dto/create-arrived-product.dto";
import { FindAllArrivedProductQueryDto } from "./dto/findAll-arrived-product-query.dto";
import { UpdateArrivedProductDto } from "./dto/update-arrived-product.dto";
export declare class ArrivedProductService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createArrivedProductDto: CreateArrivedProductDto, registerId: number): Promise<{
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        price: number | null;
        productId: number | null;
        count: number;
        priceCount: number | null;
        arrivedId: number | null;
    }>;
    findAll(dto: FindAllArrivedProductQueryDto): Promise<{
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
            Product: {
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
            Arrived: {
                supplier: {
                    id: number;
                    name: string;
                    isDeleted: boolean | null;
                    createdAt: Date;
                    updatedAt: Date;
                    registerId: number | null;
                    modifyId: number | null;
                    balance: number;
                    description: string | null;
                    phone: string;
                    phoneTwo: string | null;
                };
            } & {
                id: number;
                isDeleted: boolean | null;
                registerId: number | null;
                modifyId: number | null;
                date: Date | null;
                code: string | null;
                codeId: number | null;
                price: number;
                description: string | null;
                waybillNumber: string | null;
                supplierId: number;
                created: Date;
                updated: Date;
            };
        } & {
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            registerId: number | null;
            modifyId: number | null;
            price: number | null;
            productId: number | null;
            count: number;
            priceCount: number | null;
            arrivedId: number | null;
        })[];
    }>;
    findOne(id: number): Promise<{
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        price: number | null;
        productId: number | null;
        count: number;
        priceCount: number | null;
        arrivedId: number | null;
    }>;
    update(id: number, updateArrivedProductDto: UpdateArrivedProductDto): Promise<{
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        price: number | null;
        productId: number | null;
        count: number;
        priceCount: number | null;
        arrivedId: number | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        price: number | null;
        productId: number | null;
        count: number;
        priceCount: number | null;
        arrivedId: number | null;
    }>;
}
