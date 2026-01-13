import { PaginationDto } from '../../../common/dtos/pagination.dto';
export declare class FindAllPaidOtherGroupQueryDto extends PaginationDto {
    name?: string;
    fromDate?: Date;
    toDate?: Date;
}
