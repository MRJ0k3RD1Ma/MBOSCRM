import { IsString, IsOptional, IsBoolean, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductGroupDto {
  @ApiProperty({
    example: 'Electronics',
    description: 'Product group nomi',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 1,
    description: 'Yaratgan userning ID si',
  })
  @IsInt()
  creatorId: number;

  @ApiProperty({
    example: 1,
    description: 'Oxirgi o‘zgartirgan userning ID si',
  })
  @IsInt()
  modifyId: number;
}
