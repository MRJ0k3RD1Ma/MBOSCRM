import { ApiPropertyOptional } from '@nestjs/swagger';
import { SubscribeState } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsOptional } from 'class-validator';

export class UpdateSubscribeDto {
  @ApiPropertyOptional({ example: '2025-07-29T12:12:44.882Z' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  payingDate?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  price: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  paid: number;

  @ApiPropertyOptional({ enum: SubscribeState })
  @IsOptional()
  @IsEnum(SubscribeState)
  state: SubscribeState;
}
