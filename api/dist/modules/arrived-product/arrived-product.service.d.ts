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
        count: number;
        productId: number | null;
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
            Arrived: {
                supplier: {
                    id: number;
                    name: string;
                    isDeleted: boolean | null;
                    createdAt: Date;
                    updatedAt: Date;
                    registerId: number | null;
                    modifyId: number | null;
                    description: string | null;
                    balance: number;
                    phone: string;
                    phoneTwo: string | null;
                };
            } & {
                id: number;
                isDeleted: boolean | null;
                registerId: number | null;
                modifyId: number | null;
                price: number;
                description: string | null;
                date: Date | null;
                code: string | null;
                codeId: number | null;
                waybillNumber: string | null;
                supplierId: number;
                created: Date;
                updated: Date;
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
                type: import(".prisma/client").$Enums.ProductType;
                groupId: number;
                barcode: string | null;
                barcodeId: number | null;
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
            registerId: number | null;
            modifyId: number | null;
            price: number | null;
            count: number;
            productId: number | null;
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
        count: number;
        productId: number | null;
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
        count: number;
        productId: number | null;
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
        count: number;
        productId: number | null;
        priceCount: number | null;
        arrivedId: number | null;
    }>;
}
