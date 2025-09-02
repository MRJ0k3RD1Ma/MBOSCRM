import { CreateSubscribeDto } from "./dto/create-subscribe.dto";
import { UpdateSubscribeDto } from "./dto/update-subscribe.dto";
import { PrismaService } from "../prisma/prisma.service";
import { FindAllSubscribeQueryDto } from "./dto/findAll-subscribe-query.dto";
import { Sale } from "@prisma/client";
export declare class SubscribeService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    handleSaleCreatedEvent(sale: Sale & {
        SaleProduct: any[];
    }): Promise<void>;
    cron(): Promise<void>;
    create(createSubscribeDto: CreateSubscribeDto): Promise<{
        paying_date: Date;
        price: number;
        paid: number;
        state: import(".prisma/client").$Enums.SubscribeState;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        saleId: number | null;
        clientId: number;
    }>;
    findAll(dto: FindAllSubscribeQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: ({
            sale: {
                PaidClient: ({
                    Payment: {
                        isDeleted: boolean | null;
                        createdAt: Date;
                        updatedAt: Date;
                        id: number;
                        registerId: number | null;
                        modifyId: number | null;
                        name: string | null;
                        icon: string | null;
                    };
                } & {
                    price: number | null;
                    isDeleted: boolean | null;
                    createdAt: Date;
                    updatedAt: Date;
                    id: number;
                    saleId: number | null;
                    clientId: number | null;
                    registerId: number | null;
                    modifyId: number | null;
                    paymentId: number | null;
                    paidDate: Date | null;
                })[];
            } & {
                price: number;
                state: import(".prisma/client").$Enums.SaleState;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                clientId: number;
                date: Date | null;
                code: string | null;
                codeId: number | null;
                dept: number;
                credit: number;
                registerId: number | null;
                modifyId: number | null;
                clientName: string | null;
                subscribe_begin_date: Date | null;
                subscribe_generate_day: number | null;
            };
            client: {
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                registerId: number | null;
                modifyId: number | null;
                typeId: number | null;
                name: string;
                inn: string;
                regionId: number | null;
                districtId: number | null;
                address: string | null;
                balance: number;
                description: string | null;
                phone: string;
            };
        } & {
            paying_date: Date;
            price: number;
            paid: number;
            state: import(".prisma/client").$Enums.SubscribeState;
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            saleId: number | null;
            clientId: number;
        })[];
    }>;
    findOne(id: number): Promise<{
        sale: {
            SaleProduct: ({
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
                saleId: number | null;
                registerId: number | null;
                modifyId: number | null;
                productId: number | null;
                count: number | null;
                priceCount: number | null;
                is_subscribe: boolean | null;
            })[];
            PaidClient: ({
                Payment: {
                    isDeleted: boolean | null;
                    createdAt: Date;
                    updatedAt: Date;
                    id: number;
                    registerId: number | null;
                    modifyId: number | null;
                    name: string | null;
                    icon: string | null;
                };
            } & {
                price: number | null;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                saleId: number | null;
                clientId: number | null;
                registerId: number | null;
                modifyId: number | null;
                paymentId: number | null;
                paidDate: Date | null;
            })[];
        } & {
            price: number;
            state: import(".prisma/client").$Enums.SaleState;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            clientId: number;
            date: Date | null;
            code: string | null;
            codeId: number | null;
            dept: number;
            credit: number;
            registerId: number | null;
            modifyId: number | null;
            clientName: string | null;
            subscribe_begin_date: Date | null;
            subscribe_generate_day: number | null;
        };
        client: {
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            registerId: number | null;
            modifyId: number | null;
            typeId: number | null;
            name: string;
            inn: string;
            regionId: number | null;
            districtId: number | null;
            address: string | null;
            balance: number;
            description: string | null;
            phone: string;
        };
    } & {
        paying_date: Date;
        price: number;
        paid: number;
        state: import(".prisma/client").$Enums.SubscribeState;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        saleId: number | null;
        clientId: number;
    }>;
    update(id: number, updateSubscribeDto: UpdateSubscribeDto): Promise<{
        paying_date: Date;
        price: number;
        paid: number;
        state: import(".prisma/client").$Enums.SubscribeState;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        saleId: number | null;
        clientId: number;
    }>;
    remove(id: number): Promise<{
        paying_date: Date;
        price: number;
        paid: number;
        state: import(".prisma/client").$Enums.SubscribeState;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        saleId: number | null;
        clientId: number;
    }>;
}
