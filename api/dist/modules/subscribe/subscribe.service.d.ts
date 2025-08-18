import { CreateSubscribeDto } from './dto/create-subscribe.dto';
import { UpdateSubscribeDto } from './dto/update-subscribe.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllSubscribeQueryDto } from './dto/findAll-subscribe-query.dto';
export declare class SubscribeService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    cron(): Promise<void>;
    create(createSubscribeDto: CreateSubscribeDto): Promise<{
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        price: number;
        saleId: number | null;
        clientId: number;
        paid: number;
        state: import(".prisma/client").$Enums.SubscribeState;
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
                state: import(".prisma/client").$Enums.SaleState;
                dept: number;
                credit: number;
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
            paid: number;
            state: import(".prisma/client").$Enums.SubscribeState;
            paying_date: Date;
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
            state: import(".prisma/client").$Enums.SaleState;
            dept: number;
            credit: number;
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
        paid: number;
        state: import(".prisma/client").$Enums.SubscribeState;
        paying_date: Date;
    }>;
    update(id: number, updateSubscribeDto: UpdateSubscribeDto): Promise<{
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        price: number;
        saleId: number | null;
        clientId: number;
        paid: number;
        state: import(".prisma/client").$Enums.SubscribeState;
        paying_date: Date;
    }>;
    remove(id: number): Promise<{
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        price: number;
        saleId: number | null;
        clientId: number;
        paid: number;
        state: import(".prisma/client").$Enums.SubscribeState;
        paying_date: Date;
    }>;
}
