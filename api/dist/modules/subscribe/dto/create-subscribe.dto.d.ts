import { SubscribeState } from "@prisma/client";
export declare class CreateSubscribeDto {
    payingDate?: Date;
    clientId: number;
    saleId: number;
    price: number;
    state: SubscribeState;
}
