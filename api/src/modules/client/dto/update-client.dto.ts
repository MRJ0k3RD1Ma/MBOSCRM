import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, Matches } from 'class-validator';
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

  @ApiPropertyOptional({ example: '+998901234567' })
  @IsOptional()
  @Matches(/^\+998(9[0-9]|3[3]|7[1]|8[8]|6[1])[0-9]{7}$/, {
    message: 'Telefon raqam faqat +998 va to‘g‘ri kod bilan boshlanishi kerak',
  })
  phone?: string;

  @IsId(false)
  typeId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  balance?: number;
}
