import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsNumber, IsOptional } from 'class-validator';

export class UpdatePaidSupplierDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  @Type(() => Date)
  paidDate: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  price: number;
}
