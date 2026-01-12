import { CreatePaidServerDto } from './dto/create-paid-server.dto';
import { UpdatePaidServerDto } from './dto/update-paid-server.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllQueryPaidServerDto } from './dto/findAll-query-paid-server.dto';
export declare class PaidServerService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createPaidServerDto: CreatePaidServerDto): Promise<{
        endDate: Date;
        price: number;
        description: string | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        serverId: number;
        paymentTypeId: number;
        registerId: number | null;
        modifyId: number | null;
    }>;
    findAll(dto: FindAllQueryPaidServerDto): Promise<{
        data: ({
            paymentType: {
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                id: number;
                registerId: number | null;
                modifyId: number | null;
                name: string | null;
                icon: string | null;
            };
            server: {
                id: number;
                name: string;
            };
        } & {
            endDate: Date;
            price: number;
            description: string | null;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            serverId: number;
            paymentTypeId: number;
            registerId: number | null;
            modifyId: number | null;
        })[];
        page: number;
        limit: number;
        total: number;
        price: number;
    }>;
    findOne(id: number): Promise<{
        paymentType: {
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            registerId: number | null;
            modifyId: number | null;
            name: string | null;
            icon: string | null;
        };
        server: {
            id: number;
            name: string;
        };
    } & {
        endDate: Date;
        price: number;
        description: string | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        serverId: number;
        paymentTypeId: number;
        registerId: number | null;
        modifyId: number | null;
    }>;
    update(id: number, updatePaidServerDto: UpdatePaidServerDto): Promise<{
        endDate: Date;
        price: number;
        description: string | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        serverId: number;
        paymentTypeId: number;
        registerId: number | null;
        modifyId: number | null;
    }>;
    remove(id: number): Promise<{
        endDate: Date;
        price: number;
        description: string | null;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        serverId: number;
        paymentTypeId: number;
        registerId: number | null;
        modifyId: number | null;
    }>;
}
