import { PaginationDto } from 'src/common/dtos/pagination.dto';
export declare class FindAllSaleProductQueryDto extends PaginationDto {
    saleId?: number;
    clientId?: number;
    isSubscribe?: boolean;
    productId: number;
}
