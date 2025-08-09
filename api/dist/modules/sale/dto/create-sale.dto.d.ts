import { CreateSaleProductDto } from 'src/modules/sale-product/dto/create-sale-product.dto';
export declare class CreateSaleDto {
    date?: Date;
    clientId: number;
    subscribe_begin_date: Date;
    subscribe_generate_day: number;
    products: CreateSaleProductDto[];
}
