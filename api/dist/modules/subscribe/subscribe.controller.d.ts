import { SubscribeService } from './subscribe.service';
import { CreateSubscribeDto } from './dto/create-subscribe.dto';
import { UpdateSubscribeDto } from './dto/update-subscribe.dto';
import { FindAllSubscribeQueryDto } from './dto/findAll-subscribe-query.dto';
export declare class SubscribeController {
    private readonly subscribeService;
    constructor(subscribeService: SubscribeService);
    create(createSubscribeDto: CreateSubscribeDto): Promise<{
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        price: number;
        saleId: number | null;
        clientId: number;
        state: import(".prisma/client").$Enums.SubscribeState;
        paid: number;
        paying_date: Date;
    }>;
    findAll(dto: FindAllSubscribeQueryDto): Promise<{
        total: number;
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
                    registerId: number | null;
                    modifyId: number | null;
                    price: number | null;
                    paidDate: Date | null;
                    paymentId: number | null;
                    saleId: number | null;
                    clientId: number | null;
                })[];
                SaleProduct: ({
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
                })[];
            } & {
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
        } & {
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            price: number;
            saleId: number | null;
            clientId: number;
            state: import(".prisma/client").$Enums.SubscribeState;
            paid: number;
            paying_date: Date;
        })[];
    }>;
    findOne(id: string): Promise<{
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
                registerId: number | null;
                modifyId: number | null;
                price: number | null;
                paidDate: Date | null;
                paymentId: number | null;
                saleId: number | null;
                clientId: number | null;
            })[];
            SaleProduct: ({
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
            })[];
        } & {
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
    } & {
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        price: number;
        saleId: number | null;
        clientId: number;
        state: import(".prisma/client").$Enums.SubscribeState;
        paid: number;
        paying_date: Date;
    }>;
    update(id: string, updateSubscribeDto: UpdateSubscribeDto): Promise<{
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        price: number;
        saleId: number | null;
        clientId: number;
        state: import(".prisma/client").$Enums.SubscribeState;
        paid: number;
        paying_date: Date;
    }>;
    remove(id: string): Promise<{
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        price: number;
        saleId: number | null;
        clientId: number;
        state: import(".prisma/client").$Enums.SubscribeState;
        paid: number;
        paying_date: Date;
    }>;
}
