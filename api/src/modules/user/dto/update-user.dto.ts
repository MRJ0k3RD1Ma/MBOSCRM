import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
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

  @ApiPropertyOptional()
  @IsOptional()
  phone?: string;

  @IsId(false)
  roleId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  chatId?: string;
}
