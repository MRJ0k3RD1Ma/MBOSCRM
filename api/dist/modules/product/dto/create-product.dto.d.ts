import { ProductType } from '@prisma/client';
export declare class CreateProductDto {
    name: string;
    barcode?: string;
    groupId: number;
    unitId?: number;
    priceIncome: number;
    reminderFirst: number;
    price: number;
    type: ProductType;
}
