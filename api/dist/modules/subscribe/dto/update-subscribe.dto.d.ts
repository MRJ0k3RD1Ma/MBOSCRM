import { SubscribeState } from '@prisma/client';
export declare class UpdateSubscribeDto {
    payingDate?: Date;
    price: number;
    paid: number;
    state: SubscribeState;
}
