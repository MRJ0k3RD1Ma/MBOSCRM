import { AppealState } from '@prisma/client';
export declare class CreateAppealDto {
    name: string;
    phone: string;
    subject: string;
    detail: string;
    state?: AppealState;
}
