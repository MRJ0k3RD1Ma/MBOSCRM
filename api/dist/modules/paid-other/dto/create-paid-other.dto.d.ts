import { PaidOtherType } from '@prisma/client';
export declare class CreatePaidOtherDto {
    groupId: number;
    type: PaidOtherType;
    description: string;
    paidDate?: Date;
    price?: number;
}
