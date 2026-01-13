import { PaginationDto } from '../../../common/dtos/pagination.dto';
export declare class FindAllSupplierQueryDto extends PaginationDto {
    fromDate?: Date;
    toDate?: Date;
    name?: string;
    description?: string;
    phone?: string;
    isPositiveBalance?: boolean;
}
