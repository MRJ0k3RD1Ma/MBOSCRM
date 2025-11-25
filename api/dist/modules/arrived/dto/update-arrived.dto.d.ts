import { UpdateArrivedProductDto } from '../../arrived-product/dto/update-arrived-product.dto';
export declare class UpdateArrivedDto {
    date?: Date;
    waybillNumber?: string;
    supplierId?: number;
    description?: string;
    products: UpdateArrivedProductDto[];
}
