import { PaginationDto } from '../../../common/dtos/pagination.dto';
export declare class FindAllQueryServer extends PaginationDto {
    name?: string;
    responsible?: string;
    plan?: string;
    fromDate?: Date;
    toDate?: Date;
}
