import { PaginationDto } from '../../../common/dtos/pagination.dto';
export declare class FindAllClientCrmQueryDto extends PaginationDto {
    clientId: number;
    domain: string;
    key: string;
}
