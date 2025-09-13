import { CreatePaidServerDto } from "./dto/create-paid-server.dto";
import { UpdatePaidServerDto } from "./dto/update-paid-server.dto";
import { PrismaService } from "../prisma/prisma.service";
import { FindAllQueryPaidServerDto } from "./dto/findAll-query-paid-server.dto";
export declare class PaidServerService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createPaidServerDto: CreatePaidServerDto): Promise<{
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        price: number;
        description: string | null;
        serverId: number;
        endDate: Date;
        paymentTypeId: number;
    }>;
    findAll(dto: FindAllQueryPaidServerDto): Promise<{
        data: ({
            server: {
                id: number;
                name: string;
            };
            paymentType: {
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
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            registerId: number | null;
            modifyId: number | null;
            price: number;
            description: string | null;
            serverId: number;
            endDate: Date;
            paymentTypeId: number;
        })[];
        page: number;
        limit: number;
        total: number;
        price: number;
    }>;
    findOne(id: number): Promise<{
        server: {
            id: number;
            name: string;
        };
        paymentType: {
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
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        price: number;
        description: string | null;
        serverId: number;
        endDate: Date;
        paymentTypeId: number;
    }>;
    update(id: number, updatePaidServerDto: UpdatePaidServerDto): Promise<{
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        price: number;
        description: string | null;
        serverId: number;
        endDate: Date;
        paymentTypeId: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
        price: number;
        description: string | null;
        serverId: number;
        endDate: Date;
        paymentTypeId: number;
    }>;
}
