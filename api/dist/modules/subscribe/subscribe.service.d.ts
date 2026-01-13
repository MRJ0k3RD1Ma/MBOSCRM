import { OnModuleInit } from '@nestjs/common';
import { CreateSubscribeDto } from './dto/create-subscribe.dto';
import { UpdateSubscribeDto } from './dto/update-subscribe.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllSubscribeQueryDto } from './dto/findAll-subscribe-query.dto';
import { Sale } from '@prisma/client';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SmsService } from '../sms/sms.service';
export declare class SubscribeService implements OnModuleInit {
    private readonly prisma;
    private readonly eventEmitter;
    private readonly smsService;
    constructor(prisma: PrismaService, eventEmitter: EventEmitter2, smsService: SmsService);
    onModuleInit(): Promise<void>;
    handleSaleCreatedEvent(sale: Sale & {
        SaleProduct: any[];
    }): Promise<void>;
    cron(): Promise<void>;
    create(createSubscribeDto: CreateSubscribeDto): Promise<{
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        price: number;
        clientId: number;
        saleId: number | null;
        paid: number;
        state: import(".prisma/client").$Enums.SubscribeState;
        paying_date: Date;
        alerted: boolean;
    }>;
    findAll(dto: FindAllSubscribeQueryDto): Promise<{
        total: number;
        price: number;
        page: number;
        limit: number;
        data: ({
            client: {
                description: string | null;
                name: string;
                phone: string;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                balance: number;
                inn: string;
                address: string | null;
                regionId: number | null;
                districtId: number | null;
                typeId: number | null;
                registerId: number | null;
                modifyId: number | null;
            };
            sale: {
                PaidClient: ({
                    Payment: {
                        name: string | null;
                        isDeleted: boolean | null;
                        createdAt: Date;
                        updatedAt: Date;
                        id: number;
                        registerId: number | null;
                        modifyId: number | null;
                        icon: string | null;
                    };
                } & {
                    isDeleted: boolean | null;
                    createdAt: Date;
                    updatedAt: Date;
                    id: number;
                    price: number | null;
                    clientId: number | null;
                    saleId: number | null;
                    paymentId: number | null;
                    registerId: number | null;
                    modifyId: number | null;
                    paidDate: Date | null;
                })[];
            } & {
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                price: number;
                clientId: number;
                registerId: number | null;
                modifyId: number | null;
                credit: number;
                dept: number;
                codeId: number | null;
                subscribe_generate_day: number | null;
                date: Date | null;
                code: string | null;
                state: import(".prisma/client").$Enums.SaleState;
                clientName: string | null;
                subscribe_begin_date: Date | null;
            };
        } & {
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            price: number;
            clientId: number;
            saleId: number | null;
            paid: number;
            state: import(".prisma/client").$Enums.SubscribeState;
            paying_date: Date;
            alerted: boolean;
        })[];
    }>;
    findOne(id: number): Promise<{
        client: {
            description: string | null;
            name: string;
            phone: string;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            balance: number;
            inn: string;
            address: string | null;
            regionId: number | null;
            districtId: number | null;
            typeId: number | null;
            registerId: number | null;
            modifyId: number | null;
        };
        sale: {
            PaidClient: ({
                Payment: {
                    name: string | null;
                    isDeleted: boolean | null;
                    createdAt: Date;
                    updatedAt: Date;
                    id: number;
                    registerId: number | null;
                    modifyId: number | null;
                    icon: string | null;
                };
            } & {
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                price: number | null;
                clientId: number | null;
                saleId: number | null;
                paymentId: number | null;
                registerId: number | null;
                modifyId: number | null;
                paidDate: Date | null;
            })[];
            SaleProduct: ({
                product: {
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
            } & {
                isDeleted: boolean | null;
                createdAt: Date | null;
                updatedAt: Date | null;
                id: number;
                count: number | null;
                price: number | null;
                saleId: number | null;
                registerId: number | null;
                modifyId: number | null;
                priceCount: number | null;
                productId: number | null;
                is_subscribe: boolean | null;
            })[];
        } & {
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            price: number;
            clientId: number;
            registerId: number | null;
            modifyId: number | null;
            credit: number;
            dept: number;
            codeId: number | null;
            subscribe_generate_day: number | null;
            date: Date | null;
            code: string | null;
            state: import(".prisma/client").$Enums.SaleState;
            clientName: string | null;
            subscribe_begin_date: Date | null;
        };
    } & {
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        price: number;
        clientId: number;
        saleId: number | null;
        paid: number;
        state: import(".prisma/client").$Enums.SubscribeState;
        paying_date: Date;
        alerted: boolean;
    }>;
    update(id: number, updateSubscribeDto: UpdateSubscribeDto): Promise<{
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        price: number;
        clientId: number;
        saleId: number | null;
        paid: number;
        state: import(".prisma/client").$Enums.SubscribeState;
        paying_date: Date;
        alerted: boolean;
    }>;
    remove(id: number): Promise<{
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        price: number;
        clientId: number;
        saleId: number | null;
        paid: number;
        state: import(".prisma/client").$Enums.SubscribeState;
        paying_date: Date;
        alerted: boolean;
    }>;
}
