import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProductType } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Apple' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: '1234567890123', required: false })
  @IsOptional()
  @IsString()
  barcode?: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  groupId: number;

  @ApiPropertyOptional({ example: 2, required: false })
  @IsOptional()
  @IsNumber()
  unitId?: number;

  @ApiProperty({ example: 1000.0 })
  @IsNumber()
  priceIncome: number;

  @ApiProperty({ example: 50.0 })
  @IsNumber()
  reminderFirst: number;

  @ApiProperty({ example: 1500.0 })
  @IsNumber()
  price: number;

  @ApiProperty({ enum: ProductType, example: ProductType.DEVICE })
  @IsEnum(ProductType)
  type: ProductType;

  @ApiProperty({ example: 100.0 })
  @IsNumber()
  countReminder: number;

  @ApiProperty({ example: 200.0 })
  @IsNumber()
  countArrived: number;

  @ApiProperty({ example: 0 })
  @IsNumber()
  countSale: number;
}
