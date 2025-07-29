import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { IsName } from 'src/common/dtos/name.dto';

export class CreateSupplierDto {
  @ApiProperty({ example: 'Alibek Jumaniyazov' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: '+998901234567' })
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('UZ')
  phone: string;

  @IsName(false)
  description: string;

  @ApiPropertyOptional({ example: '+998901234567' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('UZ')
  phoneTwo?: string;

  @ApiProperty({ example: '1000000' })
  @IsNumber()
  @IsNotEmpty()
  balance: number;
}
