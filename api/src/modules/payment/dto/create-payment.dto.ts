import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreatePaymentDto {
  @ApiPropertyOptional({ example: 'Naqd' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: '💵' })
  @IsOptional()
  @IsString()
  icon?: string;
}
