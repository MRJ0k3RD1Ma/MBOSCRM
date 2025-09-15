import { PrismaService } from "../prisma/prisma.service";
import { CreateArrivedProductDto } from "./dto/create-arrived-product.dto";
import { FindAllArrivedProductQueryDto } from "./dto/findAll-arrived-product-query.dto";
import { UpdateArrivedProductDto } from "./dto/update-arrived-product.dto";
export declare class ArrivedProductService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createArrivedProductDto: CreateArrivedProductDto, registerId: number): Promise<{
        id: number;
        count: number;
        price: number | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        productId: number | null;
        registerId: number | null;
        modifyId: number | null;
        arrivedId: number | null;
        priceCount: number | null;
    }>;
    findAll(dto: FindAllArrivedProductQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: ({
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
            Arrived: {
                supplier: {
                    id: number;
                    name: string;
                    isDeleted: boolean | null;
                    createdAt: Date;
                    updatedAt: Date;
                    balance: number;
                    description: string | null;
                    registerId: number | null;
                    modifyId: number | null;
                    phone: string;
                    phoneTwo: string | null;
                };
            } & {
                id: number;
                price: number;
                isDeleted: boolean | null;
                description: string | null;
                registerId: number | null;
                modifyId: number | null;
                date: Date | null;
                code: string | null;
                codeId: number | null;
                waybillNumber: string | null;
                supplierId: number;
                created: Date;
                updated: Date;
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
            count: number;
            price: number | null;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            productId: number | null;
            registerId: number | null;
            modifyId: number | null;
            arrivedId: number | null;
            priceCount: number | null;
        })[];
    }>;
    findOne(id: number): Promise<{
        id: number;
        count: number;
        price: number | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        productId: number | null;
        registerId: number | null;
        modifyId: number | null;
        arrivedId: number | null;
        priceCount: number | null;
    }>;
    update(id: number, updateArrivedProductDto: UpdateArrivedProductDto): Promise<{
        id: number;
        count: number;
        price: number | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        productId: number | null;
        registerId: number | null;
        modifyId: number | null;
        arrivedId: number | null;
        priceCount: number | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        count: number;
        price: number | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        productId: number | null;
        registerId: number | null;
        modifyId: number | null;
        arrivedId: number | null;
        priceCount: number | null;
    }>;
}
