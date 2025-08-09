import { CreateArrivedProductDto } from 'src/modules/arrived-product/dto/create-arrived-product.dto';
export declare class CreateArrivedDto {
    date?: Date;
    waybillNumber?: string;
    supplierId: number;
    description?: string;
    products: CreateArrivedProductDto[];
}
