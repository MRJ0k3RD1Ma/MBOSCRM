import { AccessService } from './access.service';
import { FindAllAccessQueryDto } from './dto/findAll-access.dto';
import { UpdateAccessDto } from './dto/update-access.dto';
export declare class AccessController {
    private readonly accessService;
    constructor(accessService: AccessService);
    findAll(dto: FindAllAccessQueryDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: {
            description: string;
            name: string;
            id: number;
            isDeleted: boolean;
            createdAt: Date;
            updatedAt: Date;
            price: number;
            key: string;
            updatedTime: Date;
            isActive: boolean;
        }[];
    }>;
    findOne(id: string): Promise<{
        description: string;
        name: string;
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        key: string;
        updatedTime: Date;
        isActive: boolean;
    }>;
    update(id: string, updateProductDto: UpdateAccessDto): Promise<{
        description: string;
        name: string;
        id: number;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        key: string;
        updatedTime: Date;
        isActive: boolean;
    }>;
}
