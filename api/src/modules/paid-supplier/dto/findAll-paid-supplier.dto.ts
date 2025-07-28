import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsOptional } from 'class-validator';
import { IsId } from 'src/common/dtos/id.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

export class FindAllPaidSupplierQueryDto extends PaginationDto {
  @IsId(false)
  supplierId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  @Type(() => Date)
  maxPaidDate: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  @Type(() => Date)
  minPaidDate: Date;
}
