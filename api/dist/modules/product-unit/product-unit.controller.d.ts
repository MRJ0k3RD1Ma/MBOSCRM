import { ProductUnitService } from './product-unit.service';
import { CreateProductUnitDto } from './dto/create-product-unit.dto';
import { UpdateProductUnitDto } from './dto/update-product-unit.dto';
import { FindAllProductUnitQueryDto } from './dto/findAll-product-unit-query.dto';
export declare class ProductUnitController {
    private readonly productUnitService;
    constructor(productUnitService: ProductUnitService);
    create(createProductUnitDto: CreateProductUnitDto): Promise<{
        id: number;
        name: string;
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
            id: number;
            name: string;
            isDeleted: boolean | null;
            createdAt: Date;
            updatedAt: Date;
            registerId: number | null;
            modifyId: number | null;
        }[];
    }>;
    findOne(id: string): Promise<{
        id: number;
        name: string;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
    }>;
    update(id: string, updateProductUnitDto: UpdateProductUnitDto): Promise<{
        id: number;
        name: string;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
    }>;
    remove(id: string): Promise<{
        id: number;
        name: string;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        registerId: number | null;
        modifyId: number | null;
    }>;
}
