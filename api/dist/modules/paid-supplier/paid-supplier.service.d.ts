import { PrismaService } from '../prisma/prisma.service';
import { CreatePaidSupplierDto } from './dto/create-paid-supplier.dto';
import { FindAllPaidSupplierQueryDto } from './dto/findAll-paid-supplier.dto';
import { UpdatePaidSupplierDto } from './dto/update-paid-supplier.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class PaidSupplierService {
    private readonly prisma;
    private readonly eventEmitter;
    constructor(prisma: PrismaService, eventEmitter: EventEmitter2);
    onModuleInit(): Promise<void>;
    create(createPaidSupplierDto: CreatePaidSupplierDto, creatorId: number): Promise<{
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        price: number | null;
        paymentId: number | null;
        registerId: number | null;
        modifyId: number | null;
        supplierId: number | null;
        paidDate: Date | null;
    }>;
    findAll(dto: FindAllPaidSupplierQueryDto): Promise<{
        total: number;
        price: number;
        page: number;
        limit: number;
        data: ({
            register: {
                name: string;
                phone: string | null;
                username: string;
                roleId: number | null;
                chatId: string | null;
                password: string;
                id: number;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
            };
            modify: {
                name: string;
                phone: string | null;
                username: string;
                roleId: number | null;
                chatId: string | null;
                password: string;
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
            price: number | null;
            paymentId: number | null;
            registerId: number | null;
            modifyId: number | null;
            supplierId: number | null;
            paidDate: Date | null;
        })[];
    }>;
    findOne(id: number): Promise<{
        register: {
            name: string;
            phone: string | null;
            username: string;
            roleId: number | null;
            chatId: string | null;
            password: string;
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
        };
        modify: {
            name: string;
            phone: string | null;
            username: string;
            roleId: number | null;
            chatId: string | null;
            password: string;
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
        price: number | null;
        paymentId: number | null;
        registerId: number | null;
        modifyId: number | null;
        supplierId: number | null;
        paidDate: Date | null;
    }>;
    update(id: number, dto: UpdatePaidSupplierDto): Promise<{
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        price: number | null;
        paymentId: number | null;
        registerId: number | null;
        modifyId: number | null;
        supplierId: number | null;
        paidDate: Date | null;
    }>;
    remove(id: number, modifierId: number): Promise<any>;
}
