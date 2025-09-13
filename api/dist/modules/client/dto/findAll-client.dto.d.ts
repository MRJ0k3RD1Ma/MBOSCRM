import { PaginationDto } from 'src/common/dtos/pagination.dto';
export declare class FindAllClientQueryDto extends PaginationDto {
    name?: string;
    address?: string;
    description?: string;
    phone?: string;
    inn?: string;
    regionId: number;
    districtId: number;
    isPositiveBalance?: boolean;
}
