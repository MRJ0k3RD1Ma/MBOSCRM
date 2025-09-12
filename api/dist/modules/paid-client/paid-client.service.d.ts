import { CreatePaidClientDto } from "./dto/create-paid-client.dto";
import { UpdatePaidClientDto } from "./dto/update-paid-client.dto";
import { PrismaService } from "../prisma/prisma.service";
import { FindAllQueryPaidClientDto } from "./dto/findAll-query-paid-client.dto";
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
        clientId: number | null;
        saleId: number | null;
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
            Client: {
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
            Sale: {
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
        page: number;
        limit: number;
        total: number;
        price: number;
    }>;
    findOne(id: number): Promise<{
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
        Client: {
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
        Sale: {
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
        clientId: number | null;
        saleId: number | null;
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
        clientId: number | null;
        saleId: number | null;
    }>;
}
