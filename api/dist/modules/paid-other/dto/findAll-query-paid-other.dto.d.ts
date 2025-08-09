import { PaidOtherType } from '@prisma/client';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
export declare class FindAllQueryPaidOtherDto extends PaginationDto {
    minPrice?: number;
    maxPrice?: number;
    description: string;
    fromDate?: Date;
    toDate?: Date;
    groupId?: number;
    type: PaidOtherType;
}
