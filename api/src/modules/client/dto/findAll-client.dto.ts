import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsDate, IsOptional } from 'class-validator';
import { IsId } from '../../../common/dtos/id.dto';
import { IsName } from '../../../common/dtos/name.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

export class FindAllClientQueryDto extends PaginationDto {
  @ApiPropertyOptional({ example: '2025-07-01' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  fromDate?: Date;

  @ApiPropertyOptional({ example: '2025-07-30' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  toDate?: Date;

  @IsName(false)
  name?: string;

  @IsName(false)
  address?: string;

  @IsName(false)
  description?: string;

  @IsName(false)
  phone?: string;

  @IsName(false)
  inn?: string;

  @IsId(false)
  regionId: number;

  @IsId(false)
  districtId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Transform((params) => (params.value == 'true' ? true : false))
  isPositiveBalance?: boolean;
}
