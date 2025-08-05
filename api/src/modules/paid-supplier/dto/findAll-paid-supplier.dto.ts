import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { IsId } from 'src/common/dtos/id.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

export class FindAllPaidSupplierQueryDto extends PaginationDto {
  @IsId(false)
  supplierId: number;

  @IsId(false)
  paymentId: number;

  @ApiPropertyOptional({
    example: '2022-01-01',
  })
  @IsOptional()
  @Type(() => Date)
  maxPaidDate: Date;

  @ApiPropertyOptional({
    example: '2022-01-01',
  })
  @IsOptional()
  @Type(() => Date)
  minPaidDate: Date;
}
