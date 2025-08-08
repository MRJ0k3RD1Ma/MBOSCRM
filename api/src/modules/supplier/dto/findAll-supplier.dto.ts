import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';
import { IsName } from 'src/common/dtos/name.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

export class FindAllSupplierQueryDto extends PaginationDto {
  @IsName(false)
  name?: string;

  @IsName(false)
  description?: string;

  @IsName(false)
  phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Transform((params) => (params.value == 'true' ? true : false))
  isPositiveBalance?: boolean;
}
