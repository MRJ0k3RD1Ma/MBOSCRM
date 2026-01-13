import { PaginationDto } from '../../../common/dtos/pagination.dto';
export declare class FindAllClientQueryDto extends PaginationDto {
    fromDate?: Date;
    toDate?: Date;
    name?: string;
    address?: string;
    description?: string;
    phone?: string;
    inn?: string;
    regionId: number;
    districtId: number;
    isPositiveBalance?: boolean;
}
