import { PaginationDto } from 'src/common/dtos/pagination.dto';
export declare class FindAllQueryPaidClientDto extends PaginationDto {
    minPrice?: number;
    maxPrice?: number;
    fromDate?: Date;
    toDate?: Date;
    clientId?: number;
    saleId?: number;
    paymentId?: number;
}
