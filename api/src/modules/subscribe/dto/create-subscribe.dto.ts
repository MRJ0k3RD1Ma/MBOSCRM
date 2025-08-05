import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SubscribeState } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { IsId } from 'src/common/dtos/id.dto';

export class CreateSubscribeDto {
  @ApiPropertyOptional({ example: '2025-07-29T12:12:44.882Z' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  payingDate?: Date;

  @IsId()
  clientId: number;

  @IsId(false)
  saleId: number;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNumber()
  paid: number;

  @ApiPropertyOptional({ enum: SubscribeState })
  @IsOptional()
  @IsEnum(SubscribeState)
  state: SubscribeState;
}
