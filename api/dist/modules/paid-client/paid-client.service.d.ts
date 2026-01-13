import { CreatePaidClientDto } from './dto/create-paid-client.dto';
import { UpdatePaidClientDto } from './dto/update-paid-client.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllQueryPaidClientDto } from './dto/findAll-query-paid-client.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class PaidClientService {
    private readonly prisma;
    private readonly eventEmitter;
    constructor(prisma: PrismaService, eventEmitter: EventEmitter2);
    create(createPaidClientDto: CreatePaidClientDto, registerId: number): Promise<{
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
            Sale: {
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
            Client: {
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
            register: {
                name: string;
                phone: string | null;
                username: string;
                roleId: number | null;
                chatId: string | null;
                password: string;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                id: number;
            };
            modify: {
                name: string;
                phone: string | null;
                username: string;
                roleId: number | null;
                chatId: string | null;
                password: string;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                id: number;
            };
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
        page: number;
        limit: number;
        total: number;
        price: number;
    }>;
    findOne(id: number): Promise<{
        Sale: {
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
        Client: {
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
    }>;
    update(id: number, updatePaidClientDto: UpdatePaidClientDto): Promise<{
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
    }>;
    remove(id: number): Promise<{
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
    }>;
}
