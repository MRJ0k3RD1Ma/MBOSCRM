import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsInt } from 'class-validator';

export class CreateSaleProductDto {
  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsInt()
  saleId?: number;

  @ApiProperty({ example: 5 })
  @IsOptional()
  @IsInt()
  productId?: number;

  @ApiProperty({ example: 10000 })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({ example: 2 })
  @IsOptional()
  @IsNumber()
  count?: number;
}
