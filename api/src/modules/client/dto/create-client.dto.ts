import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { IsId } from 'src/common/dtos/id.dto';
import { IsName } from 'src/common/dtos/name.dto';

export class CreateClientDto {
  @IsName()
  name: string;

  @IsName()
  inn: string;

  @IsName(false)
  description: string;

  @IsName(false)
  address: string;

  @IsId(false)
  regionId: number;

  @IsId(false)
  districtId: number;

  @ApiPropertyOptional()
  @IsOptional()
  phone?: string;

  @IsId(false)
  typeId?: number;
}
