import { SaleState } from '@prisma/client';
export declare class UpdateSaleDto {
    date?: Date;
    subscribe_begin_date: Date;
    subscribe_generate_day: number;
    state?: SaleState;
}
