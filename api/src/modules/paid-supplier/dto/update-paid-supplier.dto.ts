import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional } from 'class-validator';

export class UpdatePaidSupplierDto {
  @IsDate()
  @Type(() => Date)
  @ApiPropertyOptional({
    example: '2025-07-29T12:12:44.882Z',
    description: 'ISO 8601 formatda vaqt',
  })
  paidDate: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  price: number;
}
