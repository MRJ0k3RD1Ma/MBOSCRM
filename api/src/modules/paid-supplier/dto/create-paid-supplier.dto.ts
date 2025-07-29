import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional } from 'class-validator';
import { IsId } from 'src/common/dtos/id.dto';

export class CreatePaidSupplierDto {
  @IsId()
  @ApiProperty({ example: 1 })
  supplierId: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @ApiPropertyOptional({ example: '2025-07-29T12:12:44.882Z', description: 'ISO 8601 formatda vaqt' })
  paidDate?: Date;

  @IsNumber()
  @ApiProperty({ example: 100000, description: 'To‘langan summa' })
  price: number;

  @IsId()
  @ApiProperty({ example: 1 })
  paymentId: number;
}
