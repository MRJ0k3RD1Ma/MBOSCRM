import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';
import { IsId } from '../../../common/dtos/id.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { IsName } from 'src/common/dtos/name.dto';

export class FindAllQueryPaidClientDto extends PaginationDto {
  @ApiPropertyOptional({ example: 100000 })
  @IsOptional()
  @Type(() => Number)
  minPrice?: number;

  @ApiPropertyOptional({ example: 200000 })
  @IsOptional()
  @Type(() => Number)
  maxPrice?: number;

  @IsName(false)
  clientName?: string;

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

  @IsId(false)
  clientId?: number;

  @IsId(false)
  saleId?: number;

  @IsId(false)
  paymentId?: number;
}
