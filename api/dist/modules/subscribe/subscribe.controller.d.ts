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
        clientId: number;
        price: number;
        state: import(".prisma/client").$Enums.SubscribeState;
        saleId: number | null;
        paid: number;
        paying_date: Date;
    }>;
    findAll(dto: FindAllSubscribeQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: ({
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
                    clientId: number | null;
                    price: number | null;
                    saleId: number | null;
                    paidDate: Date | null;
                    paymentId: number | null;
                })[];
            } & {
                id: number;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                registerId: number | null;
                modifyId: number | null;
                date: Date | null;
                code: string | null;
                codeId: number | null;
                clientId: number;
                price: number;
                dept: number;
                credit: number;
                state: import(".prisma/client").$Enums.SaleState;
                clientName: string | null;
                subscribe_begin_date: Date | null;
                subscribe_generate_day: number | null;
            };
            client: {
                id: number;
                name: string;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                registerId: number | null;
                modifyId: number | null;
                typeId: number | null;
                inn: string;
                regionId: number | null;
                districtId: number | null;
                address: string | null;
                balance: number;
                description: string | null;
                phone: string;
            };
        } & {
            id: number;
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
            clientId: number;
            price: number;
            state: import(".prisma/client").$Enums.SubscribeState;
            saleId: number | null;
            paid: number;
            paying_date: Date;
        })[];
    }>;
    findOne(id: string): Promise<{
        sale: {
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
                isDeleted: boolean | null;
                createdAt: Date | null;
                updatedAt: Date | null;
                registerId: number | null;
                modifyId: number | null;
                price: number | null;
                saleId: number | null;
                productId: number | null;
                count: number | null;
                priceCount: number | null;
                is_subscribe: boolean | null;
            })[];
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
                clientId: number | null;
                price: number | null;
                saleId: number | null;
                paidDate: Date | null;
                paymentId: number | null;
            })[];
        } & {
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            registerId: number | null;
            modifyId: number | null;
            date: Date | null;
            code: string | null;
            codeId: number | null;
            clientId: number;
            price: number;
            dept: number;
            credit: number;
            state: import(".prisma/client").$Enums.SaleState;
            clientName: string | null;
            subscribe_begin_date: Date | null;
            subscribe_generate_day: number | null;
        };
        client: {
            id: number;
            name: string;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            registerId: number | null;
            modifyId: number | null;
            typeId: number | null;
            inn: string;
            regionId: number | null;
            districtId: number | null;
            address: string | null;
            balance: number;
            description: string | null;
            phone: string;
        };
    } & {
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        clientId: number;
        price: number;
        state: import(".prisma/client").$Enums.SubscribeState;
        saleId: number | null;
        paid: number;
        paying_date: Date;
    }>;
    update(id: string, updateSubscribeDto: UpdateSubscribeDto): Promise<{
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        clientId: number;
        price: number;
        state: import(".prisma/client").$Enums.SubscribeState;
        saleId: number | null;
        paid: number;
        paying_date: Date;
    }>;
    remove(id: string): Promise<{
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        clientId: number;
        price: number;
        state: import(".prisma/client").$Enums.SubscribeState;
        saleId: number | null;
        paid: number;
        paying_date: Date;
    }>;
}
