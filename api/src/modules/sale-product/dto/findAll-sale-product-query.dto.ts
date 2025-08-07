import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBooleanString, IsOptional } from 'class-validator';
import { IsId } from 'src/common/dtos/id.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

export class FindAllSaleProductQueryDto extends PaginationDto {
  @IsId(false)
  saleId?: number;

  @IsId(false)
  clientId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBooleanString()
  @Type(() => Boolean)
  isSubscribe?: boolean;
}
