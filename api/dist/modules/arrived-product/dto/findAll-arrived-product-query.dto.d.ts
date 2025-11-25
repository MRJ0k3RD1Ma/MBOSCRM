import { PaginationDto } from '../../../common/dtos/pagination.dto';
export declare class FindAllArrivedProductQueryDto extends PaginationDto {
    minPrice?: number;
    maxPrice?: number;
    supplierId?: number;
    productId?: number;
    arrivedId?: number;
}
