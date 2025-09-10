import { CreateProductUnitDto } from './dto/create-product-unit.dto';
import { UpdateProductUnitDto } from './dto/update-product-unit.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllProductUnitQueryDto } from './dto/findAll-product-unit-query.dto';
export declare class ProductUnitService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    onModuleInit(): Promise<void>;
    create(dto: CreateProductUnitDto): Promise<{
        name: string;
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
    }>;
    findAll(dto: FindAllProductUnitQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: {
            name: string;
            id: number;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            registerId: number | null;
            modifyId: number | null;
        }[];
    }>;
    findOne(id: number): Promise<{
        name: string;
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
    }>;
    update(id: number, updateProductUnitDto: UpdateProductUnitDto): Promise<{
        name: string;
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
    }>;
    remove(id: number): Promise<{
        name: string;
        id: number;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
    }>;
}
