import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaidOtherType } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { IsId } from 'src/common/dtos/id.dto';

export class CreatePaidOtherDto {
  @IsId()
  groupId: number;

  @ApiProperty({ enum: PaidOtherType })
  @IsEnum(PaidOtherType)
  type: PaidOtherType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description: string;

  @ApiPropertyOptional({ example: '2025-07-29T12:12:44.882Z' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  paidDate?: Date;

  @ApiProperty({ example: 200, description: 'Payment price' })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({ example: 1, description: 'Payment method ID' })
  @IsNumber()
  @Type(() => Number)
  paymentId?: number;
}
