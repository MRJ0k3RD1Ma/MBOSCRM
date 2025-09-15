import { SubscribeService } from './subscribe.service';
import { CreateSubscribeDto } from './dto/create-subscribe.dto';
import { UpdateSubscribeDto } from './dto/update-subscribe.dto';
import { FindAllSubscribeQueryDto } from './dto/findAll-subscribe-query.dto';
export declare class SubscribeController {
    private readonly subscribeService;
    constructor(subscribeService: SubscribeService);
    create(createSubscribeDto: CreateSubscribeDto): Promise<{
        id: number;
        state: import(".prisma/client").$Enums.SubscribeState;
        price: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        clientId: number;
        saleId: number | null;
        paying_date: Date;
        paid: number;
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
                balance: number;
                typeId: number | null;
                inn: string;
                regionId: number | null;
                districtId: number | null;
                address: string | null;
                description: string | null;
                registerId: number | null;
                modifyId: number | null;
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
                    price: number | null;
                    isDeleted: boolean | null;
                    createdAt: Date;
                    updatedAt: Date;
                    clientId: number | null;
                    registerId: number | null;
                    modifyId: number | null;
                    saleId: number | null;
                    paymentId: number | null;
                    paidDate: Date | null;
                })[];
            } & {
                id: number;
                state: import(".prisma/client").$Enums.SaleState;
                price: number;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                clientId: number;
                registerId: number | null;
                modifyId: number | null;
                date: Date | null;
                code: string | null;
                codeId: number | null;
                dept: number;
                credit: number;
                clientName: string | null;
                subscribe_begin_date: Date | null;
                subscribe_generate_day: number | null;
            };
        } & {
            id: number;
            state: import(".prisma/client").$Enums.SubscribeState;
            price: number;
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
            clientId: number;
            saleId: number | null;
            paying_date: Date;
            paid: number;
        })[];
    }>;
    findOne(id: string): Promise<{
        client: {
            id: number;
            name: string;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            balance: number;
            typeId: number | null;
            inn: string;
            regionId: number | null;
            districtId: number | null;
            address: string | null;
            description: string | null;
            registerId: number | null;
            modifyId: number | null;
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
                price: number | null;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                clientId: number | null;
                registerId: number | null;
                modifyId: number | null;
                saleId: number | null;
                paymentId: number | null;
                paidDate: Date | null;
            })[];
            SaleProduct: ({
                product: {
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
            } & {
                id: number;
                count: number | null;
                price: number | null;
                isDeleted: boolean | null;
                createdAt: Date | null;
                updatedAt: Date | null;
                productId: number | null;
                registerId: number | null;
                modifyId: number | null;
                saleId: number | null;
                priceCount: number | null;
                is_subscribe: boolean | null;
            })[];
        } & {
            id: number;
            state: import(".prisma/client").$Enums.SaleState;
            price: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            clientId: number;
            registerId: number | null;
            modifyId: number | null;
            date: Date | null;
            code: string | null;
            codeId: number | null;
            dept: number;
            credit: number;
            clientName: string | null;
            subscribe_begin_date: Date | null;
            subscribe_generate_day: number | null;
        };
    } & {
        id: number;
        state: import(".prisma/client").$Enums.SubscribeState;
        price: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        clientId: number;
        saleId: number | null;
        paying_date: Date;
        paid: number;
    }>;
    update(id: string, updateSubscribeDto: UpdateSubscribeDto): Promise<{
        id: number;
        state: import(".prisma/client").$Enums.SubscribeState;
        price: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        clientId: number;
        saleId: number | null;
        paying_date: Date;
        paid: number;
    }>;
    remove(id: string): Promise<{
        id: number;
        state: import(".prisma/client").$Enums.SubscribeState;
        price: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        clientId: number;
        saleId: number | null;
        paying_date: Date;
        paid: number;
    }>;
}
