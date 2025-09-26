import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateSaleFeedbackDto } from './create-sale-feedback.dto';
import { SaleFeedbackResult, SaleFeedbackState } from '@prisma/client';
import { IsEnum, IsInt, IsNumber, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class UpdateSaleFeedbackDto {
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

  @ApiPropertyOptional({ example: 'TODO' })
  @IsOptional()
  @IsEnum(SaleFeedbackState)
  state?: SaleFeedbackState;

  @ApiPropertyOptional({ example: 'NOT_COMPLETED' })
  @IsOptional()
  @IsEnum(SaleFeedbackResult)
  result?: SaleFeedbackResult;
}

export class AliasParamDto {
  @IsUUID()
  alias: string;
}

export class UpdateStateDto {
  @ApiProperty({ example: 'TODO' })
  @IsEnum(SaleFeedbackState)
  state: SaleFeedbackState;
}
