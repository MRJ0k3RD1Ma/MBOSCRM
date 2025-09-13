import { CreatePaidClientDto } from "./dto/create-paid-client.dto";
import { UpdatePaidClientDto } from "./dto/update-paid-client.dto";
import { PrismaService } from "../prisma/prisma.service";
import { FindAllQueryPaidClientDto } from "./dto/findAll-query-paid-client.dto";
export declare class PaidClientService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createPaidClientDto: CreatePaidClientDto, registerId: number): Promise<{
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
            Sale: {
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
            modify: {
                id: number;
                name: string;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                phone: string | null;
                username: string;
                password: string;
                roleId: number | null;
                chatId: string | null;
            };
            register: {
                id: number;
                name: string;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                phone: string | null;
                username: string;
                password: string;
                roleId: number | null;
                chatId: string | null;
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
        page: number;
        limit: number;
        total: number;
        price: number;
    }>;
    findOne(id: number): Promise<{
        Client: {
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
        Sale: {
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
    }>;
    update(id: number, updatePaidClientDto: UpdatePaidClientDto): Promise<{
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
    }>;
    remove(id: number): Promise<{
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
    }>;
}
