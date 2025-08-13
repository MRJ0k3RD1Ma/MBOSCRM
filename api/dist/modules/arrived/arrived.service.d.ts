import { CreateArrivedDto } from "./dto/create-arrived.dto";
import { UpdateArrivedDto } from "./dto/update-arrived.dto";
import { PrismaService } from "../prisma/prisma.service";
import { FindAllArrivedQueryDto } from "./dto/findAll-arrived-query.dto";
import { ArrivedProductService } from "../arrived-product/arrived-product.service";
export declare class ArrivedService {
    private readonly prisma;
    private readonly arrivedProductService;
    constructor(prisma: PrismaService, arrivedProductService: ArrivedProductService);
    onModuleInit(): Promise<void>;
    create(createArrivedDto: CreateArrivedDto, creatorId: number): Promise<{
        description: string | null;
        id: number;
        isDeleted: boolean | null;
        registerId: number | null;
        modifyId: number | null;
        price: number;
        supplierId: number;
        date: Date | null;
        waybillNumber: string | null;
        code: string | null;
        codeId: number | null;
        created: Date;
        updated: Date;
    }>;
    findAll(dto: FindAllArrivedQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: ({
            supplier: {
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
            };
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
            ArrivedProduct: {
                id: number;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                registerId: number | null;
                modifyId: number | null;
                price: number | null;
                arrivedId: number | null;
                productId: number | null;
                count: number;
                priceCount: number | null;
            }[];
        } & {
            description: string | null;
            id: number;
            isDeleted: boolean | null;
            registerId: number | null;
            modifyId: number | null;
            price: number;
            supplierId: number;
            date: Date | null;
            waybillNumber: string | null;
            code: string | null;
            codeId: number | null;
            created: Date;
            updated: Date;
        })[];
    }>;
    findOne(id: number): Promise<{
        supplier: {
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
        };
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
        ArrivedProduct: {
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            registerId: number | null;
            modifyId: number | null;
            price: number | null;
            arrivedId: number | null;
            productId: number | null;
            count: number;
            priceCount: number | null;
        }[];
    } & {
        description: string | null;
        id: number;
        isDeleted: boolean | null;
        registerId: number | null;
        modifyId: number | null;
        price: number;
        supplierId: number;
        date: Date | null;
        waybillNumber: string | null;
        code: string | null;
        codeId: number | null;
        created: Date;
        updated: Date;
    }>;
    update(id: number, updateArrivedDto: UpdateArrivedDto): Promise<{
        description: string | null;
        id: number;
        isDeleted: boolean | null;
        registerId: number | null;
        modifyId: number | null;
        price: number;
        supplierId: number;
        date: Date | null;
        waybillNumber: string | null;
        code: string | null;
        codeId: number | null;
        created: Date;
        updated: Date;
    }>;
    remove(id: number): Promise<{
        description: string | null;
        id: number;
        isDeleted: boolean | null;
        registerId: number | null;
        modifyId: number | null;
        price: number;
        supplierId: number;
        date: Date | null;
        waybillNumber: string | null;
        code: string | null;
        codeId: number | null;
        created: Date;
        updated: Date;
    }>;
}
