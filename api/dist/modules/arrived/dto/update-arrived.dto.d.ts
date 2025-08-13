import { UpdateArrivedProductDto } from "src/modules/arrived-product/dto/update-arrived-product.dto";
export declare class UpdateArrivedDto {
    date?: Date;
    waybillNumber?: string;
    supplierId?: number;
    description?: string;
    products: UpdateArrivedProductDto[];
}
