import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';
import { IsName } from 'src/common/dtos/name.dto';

export class CreateSupplierDto {
  @ApiProperty({ example: 'Alibek Jumaniyazov' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: '+998901234567' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^\+998(9[0-9]|3[3]|7[1]|8[8]|6[1])[0-9]{7}$/, {
    message: 'Telefon raqam faqat +998 va to‘g‘ri kod bilan boshlanishi kerak',
  })
  phone: string;

  @IsName(false)
  description: string;

  @ApiPropertyOptional({ example: '+998901234567' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Matches(/^\+998(9[0-9]|3[3]|7[1]|8[8]|6[1])[0-9]{7}$/, {
    message: 'Telefon raqam faqat +998 va to‘g‘ri kod bilan boshlanishi kerak',
  })
  phoneTwo?: string;
}
