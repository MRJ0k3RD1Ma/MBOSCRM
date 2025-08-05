import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { IsId } from 'src/common/dtos/id.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

export class FindAllArrivedProductQueryDto extends PaginationDto {
  @ApiPropertyOptional({ example: 100000 })
  @IsOptional()
  @Type(() => Number)
  minPrice?: number;

  @ApiPropertyOptional({ example: 200000 })
  @IsOptional()
  @Type(() => Number)
  maxPrice?: number;

  @IsId(false)
  supplierId?: number;

  @IsId(false)
  productId?: number;

  @IsId(false)
  arrivedId?: number;
}
