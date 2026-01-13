import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsName } from '../../../common/dtos/name.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class FindAllQueryServer extends PaginationDto {
  @IsName(false)
  name?: string;

  @IsName(false)
  responsible?: string;

  @IsName(false)
  plan?: string;

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
}
