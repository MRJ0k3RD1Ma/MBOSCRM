import { PaginationDto } from "src/common/dtos/pagination.dto";
export declare class FindAllSimCardQueryDto extends PaginationDto {
    clientId: number;
    phoneNumber: string;
    company: string;
    description: string;
    isActive: boolean;
}
