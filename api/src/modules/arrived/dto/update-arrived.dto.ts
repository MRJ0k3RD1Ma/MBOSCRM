import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { IsId } from 'src/common/dtos/id.dto';

export class UpdateArrivedDto {
  @ApiPropertyOptional({ example: '2025-07-29T12:12:44.882Z' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date?: Date;

  @ApiPropertyOptional({ example: 'ARR-001' })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  codeId?: number;

  @ApiPropertyOptional({ example: 'WB123456' })
  @IsOptional()
  @IsString()
  waybillNumber?: string;

  @ApiPropertyOptional({ example: 3 })
  @IsOptional()
  @IsId()
  supplierId?: number;

  @ApiPropertyOptional({ example: 'Qisqacha izoh' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 150000 })
  @IsOptional()
  @IsNumber()
  price?: number;
}
