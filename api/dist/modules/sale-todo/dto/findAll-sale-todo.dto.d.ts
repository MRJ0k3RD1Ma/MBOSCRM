import { PaginationDto } from '../../../common/dtos/pagination.dto';
export declare class FindAllSaleTodoDto extends PaginationDto {
    saleId?: number;
    feedbackId?: number;
    name?: string;
    isCompleted?: boolean;
}
