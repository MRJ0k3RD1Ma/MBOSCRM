import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { IsId } from 'src/common/dtos/id.dto';

export class CreatePaidServerDto {
  @IsId()
  serverId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @IsId()
  paymentTypeId: number;

  @ApiPropertyOptional({ example: '2025-07-29T12:12:44.882Z' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endDate?: Date;

  @ApiProperty({ example: 200, description: 'Payment price' })
  @IsOptional()
  @IsNumber()
  price?: number;
}
