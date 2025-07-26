import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { IsName } from 'src/common/dtos/name.dto';

export class UpdateSupplierDto {
  @IsName(false)
  name: string;

  @IsName(false)
  phone: string;

  @IsName(false)
  description: string;

  @IsName(false)
  phoneTwo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  balance: number;
}
