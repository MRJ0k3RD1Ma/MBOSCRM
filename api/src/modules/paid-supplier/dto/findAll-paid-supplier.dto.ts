import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';
import { IsId } from '../../../common/dtos/id.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

export class FindAllPaidSupplierQueryDto extends PaginationDto {
  @IsId(false)
  supplierId: number;

  @IsId(false)
  paymentId: number;

  @ApiPropertyOptional({
    example: '2022-01-01',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  fromDate: Date;

  @ApiPropertyOptional({
    example: '2022-01-01',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  toDate: Date;
}
