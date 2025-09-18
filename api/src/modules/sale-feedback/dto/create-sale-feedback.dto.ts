import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  IsEnum,
} from 'class-validator';
import { SaleFeedbackState, SaleFeedbackResult } from '@prisma/client';

export class CreateSaleFeedbackDto {
  @ApiProperty({
    example: 1,
  })
  @IsInt()
  saleId: number;

  @ApiProperty({
    example: 'Yetkazib berish kechikdi',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @ApiProperty({
    example: 'Mahsulot 2 kun kechikib keldi.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 3,
  })
  @IsOptional()
  @IsInt()
  score?: number;
}
