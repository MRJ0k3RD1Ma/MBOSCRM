import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsNumber,
  IsOptional,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
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
  dept: number;

  @ApiPropertyOptional({ example: '2025-07-29T12:12:44.882Z' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  subscribe_begin_date: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(28)
  subscribe_generate_day: number;

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
