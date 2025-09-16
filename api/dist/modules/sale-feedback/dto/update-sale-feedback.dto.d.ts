import { CreateSaleFeedbackDto } from './create-sale-feedback.dto';
import { SaleFeedbackResult, SaleFeedbackState } from '@prisma/client';
declare const UpdateSaleFeedbackDto_base: import("@nestjs/common").Type<Partial<CreateSaleFeedbackDto>>;
export declare class UpdateSaleFeedbackDto extends UpdateSaleFeedbackDto_base {
    state?: SaleFeedbackState;
    result?: SaleFeedbackResult;
}
export declare class AliasParamDto {
    alias: string;
}
export declare class UpdateStateDto {
    state: SaleFeedbackState;
}
export {};
