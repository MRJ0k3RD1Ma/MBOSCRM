import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsInt, IsNumber, IsDate } from 'class-validator';

export class CreatePaidCrmDto {
  @ApiProperty({ example: 1, description: 'Crm ID' })
  @IsOptional()
  @IsInt()
  crmId: number;

  @ApiProperty({ example: 3, description: 'Payment ID' })
  @IsOptional()
  @IsInt()
  paymentId: number;

  @ApiPropertyOptional({ example: '2025-07-29T12:12:44.882Z' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  paidDate?: Date;

  @ApiProperty({ example: 200.5, description: 'Payment price' })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({ example: '2025-07-29T12:12:44.882Z' })
  @IsDate()
  @Type(() => Date)
  expiredFullAccess?: Date;
}
