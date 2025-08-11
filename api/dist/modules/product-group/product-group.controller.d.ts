import { ProductGroupService } from './product-group.service';
import { CreateProductGroupDto } from './dto/create-product-group.dto';
import { UpdateProductGroupDto } from './dto/update-product-group.dto';
import { FindAllProductGroupQueryDto } from './dto/findAll-product-group.dto,';
import { Request } from 'express';
export declare class ProductGroupController {
    private readonly productGroupService;
    constructor(productGroupService: ProductGroupService);
    create(createProductGroupDto: CreateProductGroupDto, req: Request): Promise<{
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
    findOne(id: string): Promise<{
        name: string;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        registerId: number;
        modifyId: number;
    }>;
    update(id: string, updateProductGroupDto: UpdateProductGroupDto, req: Request): Promise<{
        name: string;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        registerId: number;
        modifyId: number;
    }>;
    remove(id: string, req: Request): Promise<{
        name: string;
        isDeleted: boolean | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        registerId: number;
        modifyId: number;
    }>;
}
