import { SubscribeState } from '@prisma/client';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
export declare class FindAllSubscribeQueryDto extends PaginationDto {
    minPrice?: number;
    maxPrice?: number;
    fromDate?: Date;
    toDate?: Date;
    clientId?: number;
    saleId?: number;
    state: SubscribeState;
}
