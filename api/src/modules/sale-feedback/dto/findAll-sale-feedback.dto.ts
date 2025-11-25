import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SaleFeedbackResult, SaleFeedbackState } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { IsId } from '../../../common/dtos/id.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

export class FindAllSaleFeedbackDto extends PaginationDto {
  @ApiPropertyOptional({ example: 'abs' })
  @IsOptional()
  @IsString()
  name?: string;

  @IsId(false)
  saleId?: number;

  @ApiPropertyOptional({ example: 'NEW' })
  @IsOptional()
  @IsEnum(SaleFeedbackState)
  state?: SaleFeedbackState;

  @ApiPropertyOptional({ example: 'NOT_COMPLETED' })
  @IsOptional()
  @IsEnum(SaleFeedbackResult)
  result?: SaleFeedbackResult;
}
