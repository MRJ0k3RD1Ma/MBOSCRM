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
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        count: number;
        price: number | null;
        registerId: number | null;
        modifyId: number | null;
        priceCount: number | null;
        productId: number | null;
        arrivedId: number | null;
    }>;
    findAll(dto: FindAllArrivedProductQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: ({
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
            Product: {
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
                price: number;
                registerId: number | null;
                modifyId: number | null;
                barcode: string | null;
                barcodeId: number | null;
                groupId: number;
                unitId: number | null;
                priceIncome: number;
                reminderFirst: number;
                countReminder: number;
                countArrived: number;
                countSale: number;
            };
            Arrived: {
                supplier: {
                    description: string | null;
                    name: string;
                    phone: string;
                    isDeleted: boolean | null;
                    createdAt: Date;
                    updatedAt: Date;
                    id: number;
                    balance: number;
                    registerId: number | null;
                    modifyId: number | null;
                    phoneTwo: string | null;
                };
            } & {
                description: string | null;
                isDeleted: boolean | null;
                id: number;
                price: number;
                registerId: number | null;
                modifyId: number | null;
                codeId: number | null;
                date: Date | null;
                code: string | null;
                supplierId: number;
                waybillNumber: string | null;
                created: Date;
                updated: Date;
            };
        } & {
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            count: number;
            price: number | null;
            registerId: number | null;
            modifyId: number | null;
            priceCount: number | null;
            productId: number | null;
            arrivedId: number | null;
        })[];
    }>;
    findOne(id: number): Promise<{
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        count: number;
        price: number | null;
        registerId: number | null;
        modifyId: number | null;
        priceCount: number | null;
        productId: number | null;
        arrivedId: number | null;
    }>;
    update(id: number, updateArrivedProductDto: UpdateArrivedProductDto): Promise<any>;
    remove(id: number): Promise<any>;
}
