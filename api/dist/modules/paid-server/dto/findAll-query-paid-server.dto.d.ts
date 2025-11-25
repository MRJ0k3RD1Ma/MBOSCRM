import { PaginationDto } from '../../../common/dtos/pagination.dto';
export declare class FindAllQueryPaidServerDto extends PaginationDto {
    minPrice?: number;
    maxPrice?: number;
    description: string;
    fromDate?: Date;
    toDate?: Date;
    serverId?: number;
}
