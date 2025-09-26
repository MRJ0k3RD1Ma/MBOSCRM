import { SaleFeedbackResult, SaleFeedbackState } from '@prisma/client';
export declare class UpdateSaleFeedbackDto {
    name?: string;
    description?: string;
    score?: number;
    state?: SaleFeedbackState;
    result?: SaleFeedbackResult;
}
export declare class AliasParamDto {
    alias: string;
}
export declare class UpdateStateDto {
    state: SaleFeedbackState;
}
