import { PaginationDto } from '../../../common/dtos/pagination.dto';
export declare class FindAllQueryPaidClientDto extends PaginationDto {
    minPrice?: number;
    maxPrice?: number;
    clientName?: string;
    fromDate?: Date;
    toDate?: Date;
    clientId?: number;
    saleId?: number;
    paymentId?: number;
}
