import { CreatePaidClientDto } from "./dto/create-paid-client.dto";
import { UpdatePaidClientDto } from "./dto/update-paid-client.dto";
import { PrismaService } from "../prisma/prisma.service";
import { FindAllQueryPaidClientDto } from "./dto/findAll-query-paid-client.dto";
import { EventEmitter2 } from "@nestjs/event-emitter";
export declare class PaidClientService {
    private readonly prisma;
    private readonly eventEmitter;
    constructor(prisma: PrismaService, eventEmitter: EventEmitter2);
    create(createPaidClientDto: CreatePaidClientDto, registerId: number): Promise<{
        id: number;
        clientId: number | null;
        saleId: number | null;
        paymentId: number | null;
        paidDate: Date | null;
        price: number | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
    }>;
    processPayment(clientId: number, paymentAmount: number, saleId?: number): Promise<{
        paidAmount: number;
        newBalance: number;
    }>;
    checkSubscribtions(clientId: number, paymentAmount: number, currentBalance: number): Promise<{
        remainingPayment: number;
        currentBalance: number;
    }>;
    findAll(dto: FindAllQueryPaidClientDto): Promise<{
        data: ({
            Client: {
                id: number;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                registerId: number | null;
                modifyId: number | null;
                name: string;
                typeId: number | null;
                inn: string;
                regionId: number | null;
                districtId: number | null;
                address: string | null;
                balance: number;
                description: string | null;
                phone: string;
            };
            modify: {
                id: number;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                phone: string | null;
                username: string;
                password: string;
                roleId: number | null;
                chatId: string | null;
            };
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
            register: {
                id: number;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                phone: string | null;
                username: string;
                password: string;
                roleId: number | null;
                chatId: string | null;
            };
            Sale: {
                id: number;
                clientId: number;
                price: number;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                registerId: number | null;
                modifyId: number | null;
                date: Date | null;
                code: string | null;
                codeId: number | null;
                dept: number;
                credit: number;
                state: import(".prisma/client").$Enums.SaleState;
                clientName: string | null;
                subscribe_begin_date: Date | null;
                subscribe_generate_day: number | null;
            };
        } & {
            id: number;
            clientId: number | null;
            saleId: number | null;
            paymentId: number | null;
            paidDate: Date | null;
            price: number | null;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            registerId: number | null;
            modifyId: number | null;
        })[];
        page: number;
        limit: number;
        total: number;
        price: number;
    }>;
    findOne(id: number): Promise<{
        Client: {
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            registerId: number | null;
            modifyId: number | null;
            name: string;
            typeId: number | null;
            inn: string;
            regionId: number | null;
            districtId: number | null;
            address: string | null;
            balance: number;
            description: string | null;
            phone: string;
        };
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
        Sale: {
            id: number;
            clientId: number;
            price: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            registerId: number | null;
            modifyId: number | null;
            date: Date | null;
            code: string | null;
            codeId: number | null;
            dept: number;
            credit: number;
            state: import(".prisma/client").$Enums.SaleState;
            clientName: string | null;
            subscribe_begin_date: Date | null;
            subscribe_generate_day: number | null;
        };
    } & {
        id: number;
        clientId: number | null;
        saleId: number | null;
        paymentId: number | null;
        paidDate: Date | null;
        price: number | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
    }>;
    update(id: number, updatePaidClientDto: UpdatePaidClientDto): Promise<{
        id: number;
        clientId: number | null;
        saleId: number | null;
        paymentId: number | null;
        paidDate: Date | null;
        price: number | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        clientId: number | null;
        saleId: number | null;
        paymentId: number | null;
        paidDate: Date | null;
        price: number | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
    }>;
}
