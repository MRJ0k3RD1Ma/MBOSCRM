import { IsString, IsOptional, IsBoolean, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductGroupDto {
  @ApiProperty({
    example: 'Electronics',
    description: 'Product group nomi',
  })
  @IsString()
  name: string;
}
