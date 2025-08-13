import { CreatePaidServerDto } from './dto/create-paid-server.dto';
import { UpdatePaidServerDto } from './dto/update-paid-server.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllQueryPaidServerDto } from './dto/findAll-query-paid-server.dto';
export declare class PaidServerService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createPaidServerDto: CreatePaidServerDto): Promise<{
        description: string | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        registerId: number | null;
        modifyId: number | null;
        price: number;
        serverId: number;
        paymentTypeId: number;
        endDate: Date;
    }>;
    findAll(dto: FindAllQueryPaidServerDto): Promise<({
        server: {
            name: string;
            id: number;
        };
        paymentType: {
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
        description: string | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        registerId: number | null;
        modifyId: number | null;
        price: number;
        serverId: number;
        paymentTypeId: number;
        endDate: Date;
    })[]>;
    findOne(id: number): Promise<{
        server: {
            name: string;
            id: number;
        };
        paymentType: {
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
        description: string | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        registerId: number | null;
        modifyId: number | null;
        price: number;
        serverId: number;
        paymentTypeId: number;
        endDate: Date;
    }>;
    update(id: number, updatePaidServerDto: UpdatePaidServerDto): Promise<{
        description: string | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        registerId: number | null;
        modifyId: number | null;
        price: number;
        serverId: number;
        paymentTypeId: number;
        endDate: Date;
    }>;
    remove(id: number): Promise<{
        description: string | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        registerId: number | null;
        modifyId: number | null;
        price: number;
        serverId: number;
        paymentTypeId: number;
        endDate: Date;
    }>;
}
