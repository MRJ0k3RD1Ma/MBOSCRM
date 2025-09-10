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
                id: number;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
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
                        id: number;
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
                    saleId: number | null;
                    clientId: number | null;
                })[];
            } & {
                id: number;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
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
            id: number;
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
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
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
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
                    id: number;
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
                saleId: number | null;
                clientId: number | null;
            })[];
            SaleProduct: ({
                product: {
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
            } & {
                id: number;
                isDeleted: boolean | null;
                createdAt: Date | null;
                updatedAt: Date | null;
                registerId: number | null;
                modifyId: number | null;
                price: number | null;
                count: number | null;
                productId: number | null;
                priceCount: number | null;
                saleId: number | null;
                is_subscribe: boolean | null;
            })[];
        } & {
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
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
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        saleId: number | null;
        clientId: number;
        state: import(".prisma/client").$Enums.SubscribeState;
        paid: number;
        paying_date: Date;
    }>;
    update(id: string, updateSubscribeDto: UpdateSubscribeDto): Promise<{
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        saleId: number | null;
        clientId: number;
        state: import(".prisma/client").$Enums.SubscribeState;
        paid: number;
        paying_date: Date;
    }>;
    remove(id: string): Promise<{
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        saleId: number | null;
        clientId: number;
        state: import(".prisma/client").$Enums.SubscribeState;
        paid: number;
        paying_date: Date;
    }>;
}
