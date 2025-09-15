import { PaginationDto } from 'src/common/dtos/pagination.dto';
export declare class FindAllSupplierQueryDto extends PaginationDto {
    name?: string;
    description?: string;
    phone?: string;
    isPositiveBalance?: boolean;
}
