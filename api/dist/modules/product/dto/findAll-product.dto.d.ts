import { ProductType } from '@prisma/client';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
export declare class FindAllProductQueryDto extends PaginationDto {
    minPrice?: number;
    maxPrice?: number;
    minCount?: number;
    maxCount?: number;
    type: ProductType;
    name?: string;
    barcode?: string;
    groupId?: number;
    unitId?: number;
}
