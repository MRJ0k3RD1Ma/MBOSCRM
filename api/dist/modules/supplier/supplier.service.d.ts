import { PrismaService } from '../prisma/prisma.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { FindAllSupplierQueryDto } from './dto/findAll-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
export declare class SupplierService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    onModuleInit(): Promise<void>;
    create(createSupplierDto: CreateSupplierDto, creatorId: number): Promise<{
        id: number;
        name: string;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        balance: number;
        description: string | null;
        registerId: number | null;
        modifyId: number | null;
        phone: string;
        phoneTwo: string | null;
    }>;
    findAll(dto: FindAllSupplierQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: ({
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
            name: string;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            balance: number;
            description: string | null;
            registerId: number | null;
            modifyId: number | null;
            phone: string;
            phoneTwo: string | null;
        })[];
    }>;
    findOne(id: number): Promise<{
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
        name: string;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        balance: number;
        description: string | null;
        registerId: number | null;
        modifyId: number | null;
        phone: string;
        phoneTwo: string | null;
    }>;
    update(id: number, dto: UpdateSupplierDto, creatorId: number): Promise<{
        id: number;
        name: string;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        balance: number;
        description: string | null;
        registerId: number | null;
        modifyId: number | null;
        phone: string;
        phoneTwo: string | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        balance: number;
        description: string | null;
        registerId: number | null;
        modifyId: number | null;
        phone: string;
        phoneTwo: string | null;
    }>;
}
