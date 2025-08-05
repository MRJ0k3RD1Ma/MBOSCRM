import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsInt, IsNumber, IsDate } from 'class-validator';

export class CreatePaidClientDto {
  @ApiProperty({ example: 1, description: 'Client ID' })
  @IsOptional()
  @IsInt()
  clientId?: number;

  @ApiProperty({ example: 5, description: 'Sale ID' })
  @IsOptional()
  @IsInt()
  saleId?: number;

  @ApiProperty({ example: 3, description: 'Payment ID' })
  @IsOptional()
  @IsInt()
  paymentId?: number;

  @ApiPropertyOptional({ example: '2025-07-29T12:12:44.882Z' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  paidDate?: Date;

  @ApiProperty({ example: 200.5, description: 'Payment price' })
  @IsOptional()
  @IsNumber()
  price?: number;
}
