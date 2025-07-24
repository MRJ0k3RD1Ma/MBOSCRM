import { PartialType } from '@nestjs/swagger';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { IsName } from 'src/common/dtos/name.dto';
import { IsPassword } from 'src/common/dtos/password.dto';

export class UpdateUserDto  {
  @IsName(false)
  name?: string;
  
  @IsPassword(false)
  newPassword?: string;

  @IsPassword(false)
  oldPassword?: string;
}
