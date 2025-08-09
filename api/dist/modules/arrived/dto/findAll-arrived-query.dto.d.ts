import { PaginationDto } from 'src/common/dtos/pagination.dto';
export declare class FindAllArrivedQueryDto extends PaginationDto {
    minPrice?: number;
    maxPrice?: number;
    fromDate?: Date;
    toDate?: Date;
    supplierId?: number;
    code?: string;
}
