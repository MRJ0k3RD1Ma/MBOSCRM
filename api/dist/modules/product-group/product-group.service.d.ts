import { CreateProductGroupDto } from './dto/create-product-group.dto';
import { UpdateProductGroupDto } from './dto/update-product-group.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllProductGroupQueryDto } from './dto/findAll-product-group.dto,';
export declare class ProductGroupService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    onModuleInit(): Promise<void>;
    create(createProductGroupDto: CreateProductGroupDto, creatorId: number): Promise<{
        name: string;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        registerId: number;
        modifyId: number;
    }>;
    findAll(dto: FindAllProductGroupQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: {
            name: string;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            registerId: number;
            modifyId: number;
        }[];
    }>;
    findOne(id: number): Promise<{
        name: string;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        registerId: number;
        modifyId: number;
    }>;
    update(id: number, updateProductGroupDto: UpdateProductGroupDto, userId: number): Promise<{
        name: string;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        registerId: number;
        modifyId: number;
    }>;
    remove(id: number, modifierId: number): Promise<{
        name: string;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        registerId: number;
        modifyId: number;
    }>;
}
