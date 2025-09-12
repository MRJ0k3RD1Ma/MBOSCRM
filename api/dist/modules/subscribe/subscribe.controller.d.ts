import { SubscribeService } from './subscribe.service';
import { CreateSubscribeDto } from './dto/create-subscribe.dto';
import { UpdateSubscribeDto } from './dto/update-subscribe.dto';
import { FindAllSubscribeQueryDto } from './dto/findAll-subscribe-query.dto';
export declare class SubscribeController {
    private readonly subscribeService;
    constructor(subscribeService: SubscribeService);
    create(createSubscribeDto: CreateSubscribeDto): Promise<{
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        state: import(".prisma/client").$Enums.SubscribeState;
        price: number;
        paid: number;
        clientId: number;
        saleId: number | null;
        paying_date: Date;
    }>;
    findAll(dto: FindAllSubscribeQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: ({
            client: {
                id: number;
                name: string;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                registerId: number | null;
                modifyId: number | null;
                description: string | null;
                balance: number;
                typeId: number | null;
                inn: string;
                regionId: number | null;
                districtId: number | null;
                address: string | null;
                phone: string;
            };
            sale: {
                PaidClient: ({
                    Payment: {
                        id: number;
                        name: string | null;
                        isDeleted: boolean | null;
                        createdAt: Date;
                        updatedAt: Date;
                        registerId: number | null;
                        modifyId: number | null;
                        icon: string | null;
                    };
                } & {
                    id: number;
                    isDeleted: boolean | null;
                    createdAt: Date;
                    updatedAt: Date;
                    registerId: number | null;
                    modifyId: number | null;
                    price: number | null;
                    paidDate: Date | null;
                    paymentId: number | null;
                    clientId: number | null;
                    saleId: number | null;
                })[];
            } & {
                id: number;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                registerId: number | null;
                modifyId: number | null;
                state: import(".prisma/client").$Enums.SaleState;
                price: number;
                credit: number;
                clientId: number;
                date: Date | null;
                code: string | null;
                codeId: number | null;
                dept: number;
                clientName: string | null;
                subscribe_begin_date: Date | null;
                subscribe_generate_day: number | null;
            };
        } & {
            id: number;
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
            state: import(".prisma/client").$Enums.SubscribeState;
            price: number;
            paid: number;
            clientId: number;
            saleId: number | null;
            paying_date: Date;
        })[];
    }>;
    findOne(id: string): Promise<{
        client: {
            id: number;
            name: string;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            registerId: number | null;
            modifyId: number | null;
            description: string | null;
            balance: number;
            typeId: number | null;
            inn: string;
            regionId: number | null;
            districtId: number | null;
            address: string | null;
            phone: string;
        };
        sale: {
            PaidClient: ({
                Payment: {
                    id: number;
                    name: string | null;
                    isDeleted: boolean | null;
                    createdAt: Date;
                    updatedAt: Date;
                    registerId: number | null;
                    modifyId: number | null;
                    icon: string | null;
                };
            } & {
                id: number;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                registerId: number | null;
                modifyId: number | null;
                price: number | null;
                paidDate: Date | null;
                paymentId: number | null;
                clientId: number | null;
                saleId: number | null;
            })[];
            SaleProduct: ({
                product: {
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
                createdAt: Date | null;
                updatedAt: Date | null;
                registerId: number | null;
                modifyId: number | null;
                price: number | null;
                count: number | null;
                saleId: number | null;
                productId: number | null;
                priceCount: number | null;
                is_subscribe: boolean | null;
            })[];
        } & {
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            registerId: number | null;
            modifyId: number | null;
            state: import(".prisma/client").$Enums.SaleState;
            price: number;
            credit: number;
            clientId: number;
            date: Date | null;
            code: string | null;
            codeId: number | null;
            dept: number;
            clientName: string | null;
            subscribe_begin_date: Date | null;
            subscribe_generate_day: number | null;
        };
    } & {
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        state: import(".prisma/client").$Enums.SubscribeState;
        price: number;
        paid: number;
        clientId: number;
        saleId: number | null;
        paying_date: Date;
    }>;
    update(id: string, updateSubscribeDto: UpdateSubscribeDto): Promise<{
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        state: import(".prisma/client").$Enums.SubscribeState;
        price: number;
        paid: number;
        clientId: number;
        saleId: number | null;
        paying_date: Date;
    }>;
    remove(id: string): Promise<{
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        state: import(".prisma/client").$Enums.SubscribeState;
        price: number;
        paid: number;
        clientId: number;
        saleId: number | null;
        paying_date: Date;
    }>;
}
