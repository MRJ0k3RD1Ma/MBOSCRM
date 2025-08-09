import { PaginationDto } from 'src/common/dtos/pagination.dto';
export declare class FindAllSaleQueryDto extends PaginationDto {
    minPrice?: number;
    maxPrice?: number;
    fromDate?: Date;
    toDate?: Date;
    credit: boolean;
    clientId?: number;
    code?: string;
}
