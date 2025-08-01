import { PartialType } from '@nestjs/swagger';
import { CreateSaleProductDto } from './create-sale-product.dto';

export class UpdateSaleProductDto extends PartialType(CreateSaleProductDto) {}
