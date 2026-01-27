import { PrismaService } from '../prisma/prisma.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { FindAllSupplierQueryDto } from './dto/findAll-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
export declare class SupplierService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    recalculate(supplierId: number): Promise<void>;
    onModuleInit(): Promise<void>;
    create(createSupplierDto: CreateSupplierDto, creatorId: number): Promise<{
        description: string | null;
        name: string;
        phone: string;
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        balance: number;
        registerId: number | null;
        modifyId: number | null;
        phoneTwo: string | null;
    }>;
    findAll(dto: FindAllSupplierQueryDto): Promise<{
        total: number;
        totals: {
            price: number;
        };
        page: number;
        limit: number;
        data: {
            paidPrice: number;
            arrivedPrice: number;
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
            description: string | null;
            name: string;
            phone: string;
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            balance: number;
            registerId: number | null;
            modifyId: number | null;
            phoneTwo: string | null;
        }[];
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
    } & {
        description: string | null;
        name: string;
        phone: string;
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        balance: number;
        registerId: number | null;
        modifyId: number | null;
        phoneTwo: string | null;
    }>;
    update(id: number, dto: UpdateSupplierDto, creatorId: number): Promise<{
        description: string | null;
        name: string;
        phone: string;
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        balance: number;
        registerId: number | null;
        modifyId: number | null;
        phoneTwo: string | null;
    }>;
    remove(id: number): Promise<{
        description: string | null;
        name: string;
        phone: string;
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        balance: number;
        registerId: number | null;
        modifyId: number | null;
        phoneTwo: string | null;
    }>;
}
