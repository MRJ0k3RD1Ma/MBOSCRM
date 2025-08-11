import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Matches } from 'class-validator';
import { IsId } from 'src/common/dtos/id.dto';
import { IsName } from 'src/common/dtos/name.dto';
import { IsPassword } from 'src/common/dtos/password.dto';

export class UpdateUserDto {
  @IsName(false)
  name?: string;

  @IsName(false)
  username?: string;

  @IsPassword(false)
  password?: string;

  @ApiPropertyOptional({ example: '+998901234567' })
  @IsOptional()
  @Matches(/^\+998(9[0-9]|3[3]|7[1]|8[8]|6[1])[0-9]{7}$/, {
    message: 'Telefon raqam faqat +998 va to‘g‘ri kod bilan boshlanishi kerak',
  })
  phone?: string;

  @IsId(false)
  roleId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  chatId?: string;
}
