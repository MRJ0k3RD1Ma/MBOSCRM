import { CreatePaidClientDto } from './dto/create-paid-client.dto';
import { UpdatePaidClientDto } from './dto/update-paid-client.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllQueryPaidClientDto } from './dto/findAll-query-paid-client.dto';
export declare class PaidClientService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createPaidClientDto: CreatePaidClientDto, registerId: number): Promise<{
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
    }>;
    processPayment(clientId: number, paymentAmount: number, saleId?: number): Promise<{
        paidAmount: number;
        newBalance: number;
    }>;
    checkSubscribtions(clientId: number, paymentAmount: number, currentBalance: number): Promise<{
        remainingPayment: number;
        currentBalance: number;
    }>;
    findAll(dto: FindAllQueryPaidClientDto): Promise<({
        Sale: {
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
            state: import(".prisma/client").$Enums.SaleState;
            dept: number;
            credit: number;
            clientName: string | null;
            subscribe_begin_date: Date | null;
            subscribe_generate_day: number | null;
        };
        Client: {
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
        modify: {
            name: string;
            username: string;
            password: string;
            phone: string | null;
            roleId: number | null;
            chatId: string | null;
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
        };
        register: {
            name: string;
            username: string;
            password: string;
            phone: string | null;
            roleId: number | null;
            chatId: string | null;
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
        };
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
    })[]>;
    findOne(id: number): Promise<{
        Sale: {
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
            state: import(".prisma/client").$Enums.SaleState;
            dept: number;
            credit: number;
            clientName: string | null;
            subscribe_begin_date: Date | null;
            subscribe_generate_day: number | null;
        };
        Client: {
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
    }>;
    update(id: number, updatePaidClientDto: UpdatePaidClientDto): Promise<{
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
    }>;
    remove(id: number): Promise<{
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
    }>;
}
