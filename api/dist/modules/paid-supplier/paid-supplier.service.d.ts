import { PrismaService } from "../prisma/prisma.service";
import { CreatePaidSupplierDto } from "./dto/create-paid-supplier.dto";
import { FindAllPaidSupplierQueryDto } from "./dto/findAll-paid-supplier.dto";
import { UpdatePaidSupplierDto } from "./dto/update-paid-supplier.dto";
import { EventEmitter2 } from "@nestjs/event-emitter";
export declare class PaidSupplierService {
    private readonly prisma;
    private readonly eventEmitter;
    constructor(prisma: PrismaService, eventEmitter: EventEmitter2);
    onModuleInit(): Promise<void>;
    create(createPaidSupplierDto: CreatePaidSupplierDto, creatorId: number): Promise<{
        id: number;
        supplierId: number | null;
        paidDate: Date | null;
        price: number | null;
        paymentId: number | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
    }>;
    findAll(dto: FindAllPaidSupplierQueryDto): Promise<{
        total: number;
        price: number;
        page: number;
        limit: number;
        data: ({
            modify: {
                id: number;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                username: string;
                password: string;
                phone: string | null;
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
                username: string;
                password: string;
                phone: string | null;
                roleId: number | null;
                chatId: string | null;
            };
        } & {
            id: number;
            supplierId: number | null;
            paidDate: Date | null;
            price: number | null;
            paymentId: number | null;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            registerId: number | null;
            modifyId: number | null;
        })[];
    }>;
    findOne(id: number): Promise<{
        modify: {
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            username: string;
            password: string;
            phone: string | null;
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
            username: string;
            password: string;
            phone: string | null;
            roleId: number | null;
            chatId: string | null;
        };
    } & {
        id: number;
        supplierId: number | null;
        paidDate: Date | null;
        price: number | null;
        paymentId: number | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
    }>;
    update(id: number, dto: UpdatePaidSupplierDto): Promise<{
        id: number;
        supplierId: number | null;
        paidDate: Date | null;
        price: number | null;
        paymentId: number | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
    }>;
    remove(id: number, modifierId: number): Promise<any>;
}
