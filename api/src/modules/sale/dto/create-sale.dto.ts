import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { IsId } from 'src/common/dtos/id.dto';
import { CreateSaleProductDto } from 'src/modules/sale-product/dto/create-sale-product.dto';

export class CreateSaleDto {
  @ApiPropertyOptional({ example: '2025-07-29T12:12:44.882Z' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date?: Date;

  @IsId()
  clientId: number;

  @ApiProperty()
  @IsNumber()
  credit: number;

  @ApiProperty({
    example: [
      {
        productId: 1,
        count: 1,
        price: 1,
      },
    ],
  })
  @ValidateNested({ each: true })
  products: CreateSaleProductDto[];
}
