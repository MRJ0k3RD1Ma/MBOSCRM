import { SaleFeedbackResult, SaleFeedbackState } from '@prisma/client';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
export declare class FindAllSaleFeedbackDto extends PaginationDto {
    name?: string;
    saleId?: number;
    state?: SaleFeedbackState;
    result?: SaleFeedbackResult;
}
