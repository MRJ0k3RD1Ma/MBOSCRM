import { PrismaService } from "../prisma/prisma.service";
import { CreateArrivedProductDto } from "./dto/create-arrived-product.dto";
import { FindAllArrivedProductQueryDto } from "./dto/findAll-arrived-product-query.dto";
import { UpdateArrivedProductDto } from "./dto/update-arrived-product.dto";
import { EventEmitter2 } from "@nestjs/event-emitter";
export declare class ArrivedProductService {
    private readonly prisma;
    private readonly eventEmitter;
    constructor(prisma: PrismaService, eventEmitter: EventEmitter2);
    create(createArrivedProductDto: CreateArrivedProductDto, registerId: number): Promise<{
        id: number;
        arrivedId: number | null;
        productId: number | null;
        count: number;
        price: number | null;
        priceCount: number | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
    }>;
    findAll(dto: FindAllArrivedProductQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: ({
            Arrived: {
                supplier: {
                    id: number;
                    isDeleted: boolean | null;
                    createdAt: Date;
                    updatedAt: Date;
                    registerId: number | null;
                    modifyId: number | null;
                    name: string;
                    description: string | null;
                    phone: string;
                    phoneTwo: string | null;
                    balance: number;
                };
            } & {
                id: number;
                price: number;
                isDeleted: boolean | null;
                registerId: number | null;
                modifyId: number | null;
                date: Date | null;
                code: string | null;
                codeId: number | null;
                waybillNumber: string | null;
                supplierId: number;
                description: string | null;
                created: Date;
                updated: Date;
            };
            Product: {
                ProductUnit: {
                    id: number;
                    isDeleted: boolean | null;
                    createdAt: Date;
                    updatedAt: Date;
                    registerId: number | null;
                    modifyId: number | null;
                    name: string;
                };
            } & {
                id: number;
                price: number;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
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
            register: {
                id: number;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                phone: string | null;
                username: string;
                password: string;
                roleId: number | null;
                chatId: string | null;
            };
        } & {
            id: number;
            arrivedId: number | null;
            productId: number | null;
            count: number;
            price: number | null;
            priceCount: number | null;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            registerId: number | null;
            modifyId: number | null;
        })[];
    }>;
    findOne(id: number): Promise<{
        id: number;
        arrivedId: number | null;
        productId: number | null;
        count: number;
        price: number | null;
        priceCount: number | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
    }>;
    update(id: number, updateArrivedProductDto: UpdateArrivedProductDto): Promise<any>;
    remove(id: number): Promise<any>;
}
