import { ProductType } from '@prisma/client';
export declare class UpdateProductDto {
    name?: string;
    barcode?: string;
    barcodeId?: number;
    groupId?: number;
    unitId?: number;
    priceIncome?: number;
    reminderFirst?: number;
    price?: number;
    type?: ProductType;
    countReminder?: number;
    countArrived?: number;
    countSale?: number;
}
