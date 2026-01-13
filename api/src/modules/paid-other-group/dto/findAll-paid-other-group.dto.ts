import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { Type } from 'class-transformer';

export class FindAllPaidOtherGroupQueryDto extends PaginationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

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
