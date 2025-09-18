import { PaginationDto } from 'src/common/dtos/pagination.dto';
export declare class FindAllQueryPaidCrmDto extends PaginationDto {
    minPrice?: number;
    maxPrice?: number;
    fromDate?: Date;
    toDate?: Date;
    crmId?: number;
    paymentId?: number;
}
