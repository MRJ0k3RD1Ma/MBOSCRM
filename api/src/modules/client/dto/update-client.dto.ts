import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { IsId } from 'src/common/dtos/id.dto';
import { IsName } from 'src/common/dtos/name.dto';

export class UpdateClientDto {
  @IsName(false)
  name?: string;

  @IsName(false)
  inn?: string;

  @IsName(false)
  description?: string;

  @IsName(false)
  address?: string;

  @IsId(false)
  regionId?: number;

  @IsId(false)
  districtId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  phone?: string;

  @IsId(false)
  typeId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  balance?: number;
}
