import { PaginationDto } from '../../../common/dtos/pagination.dto';
export declare enum ClientSortBy {
    TOTAL_PAID = "totalPaid",
    TOTAL_SALE = "totalSale",
    TOTAL_SUB = "totalSub",
    TOTAL_BALANCE = "totalBalance"
}
export declare enum SortOrder {
    ASC = "asc",
    DESC = "desc"
}
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
    sortBy?: ClientSortBy;
    sortOrder?: SortOrder;
}
