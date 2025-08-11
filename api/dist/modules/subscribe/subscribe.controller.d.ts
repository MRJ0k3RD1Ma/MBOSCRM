import { SubscribeService } from './subscribe.service';
import { CreateSubscribeDto } from './dto/create-subscribe.dto';
import { UpdateSubscribeDto } from './dto/update-subscribe.dto';
import { FindAllSubscribeQueryDto } from './dto/findAll-subscribe-query.dto';
export declare class SubscribeController {
    private readonly subscribeService;
    constructor(subscribeService: SubscribeService);
    create(createSubscribeDto: CreateSubscribeDto): Promise<{
        paid: number;
        price: number;
        state: import(".prisma/client").$Enums.SubscribeState;
        id: number;
        clientId: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
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
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
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
            sale: {
                PaidClient: ({
                    Payment: {
                        id: number;
                        isDeleted: boolean | null;
                        createdAt: Date;
                        updatedAt: Date;
                        registerId: number | null;
                        modifyId: number | null;
                        name: string | null;
                        icon: string | null;
                    };
                } & {
                    price: number | null;
                    id: number;
                    clientId: number | null;
                    isDeleted: boolean | null;
                    createdAt: Date;
                    updatedAt: Date;
                    registerId: number | null;
                    modifyId: number | null;
                    saleId: number | null;
                    paymentId: number | null;
                    paidDate: Date | null;
                })[];
            } & {
                price: number;
                state: import(".prisma/client").$Enums.SaleState;
                id: number;
                date: Date | null;
                code: string | null;
                codeId: number | null;
                clientId: number;
                dept: number;
                credit: number;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                registerId: number | null;
                modifyId: number | null;
                clientName: string | null;
                subscribe_begin_date: Date | null;
                subscribe_generate_day: number | null;
            };
        } & {
            paid: number;
            price: number;
            state: import(".prisma/client").$Enums.SubscribeState;
            id: number;
            clientId: number;
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
            saleId: number | null;
            paying_date: Date;
        })[];
    }>;
    findOne(id: string): Promise<{
        client: {
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
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
        sale: {
            price: number;
            state: import(".prisma/client").$Enums.SaleState;
            id: number;
            date: Date | null;
            code: string | null;
            codeId: number | null;
            clientId: number;
            dept: number;
            credit: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            registerId: number | null;
            modifyId: number | null;
            clientName: string | null;
            subscribe_begin_date: Date | null;
            subscribe_generate_day: number | null;
        };
    } & {
        paid: number;
        price: number;
        state: import(".prisma/client").$Enums.SubscribeState;
        id: number;
        clientId: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        saleId: number | null;
        paying_date: Date;
    }>;
    update(id: string, updateSubscribeDto: UpdateSubscribeDto): Promise<{
        paid: number;
        price: number;
        state: import(".prisma/client").$Enums.SubscribeState;
        id: number;
        clientId: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        saleId: number | null;
        paying_date: Date;
    }>;
    remove(id: string): Promise<{
        paid: number;
        price: number;
        state: import(".prisma/client").$Enums.SubscribeState;
        id: number;
        clientId: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        saleId: number | null;
        paying_date: Date;
    }>;
}
