import { PrismaService } from '../prisma/prisma.service';
import { CreateArrivedProductDto } from './dto/create-arrived-product.dto';
import { FindAllArrivedProductQueryDto } from './dto/findAll-arrived-product-query.dto';
import { UpdateArrivedProductDto } from './dto/update-arrived-product.dto';
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
                id: number;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
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
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            registerId: number | null;
            modifyId: number | null;
            price: number | null;
            arrivedId: number | null;
            productId: number | null;
            count: number;
            priceCount: number | null;
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
        arrivedId: number | null;
        productId: number | null;
        count: number;
        priceCount: number | null;
    }>;
    update(id: number, updateArrivedProductDto: UpdateArrivedProductDto): Promise<{
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        price: number | null;
        arrivedId: number | null;
        productId: number | null;
        count: number;
        priceCount: number | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        price: number | null;
        arrivedId: number | null;
        productId: number | null;
        count: number;
        priceCount: number | null;
    }>;
}
