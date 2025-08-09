import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsPhoneNumber, Matches } from 'class-validator';
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

  @ApiPropertyOptional({ example: 1000 })
  @IsOptional()
  balance?: number;

  @ApiProperty({ example: '+998901234567' })
  @Matches(/^\+998\d{9}$/, {
    message: 'Phone number must be a valid Uzbekistan phone number (+998XXXXXXXXX)',
  })
  phone: string;

  @IsId(false)
  typeId?: number;
}
