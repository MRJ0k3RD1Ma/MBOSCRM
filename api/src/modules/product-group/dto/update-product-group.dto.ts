import { IsString, IsOptional, IsBoolean, IsInt } from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class UpdateProductGroupDto {
  @ApiPropertyOptional({
    example: 'Updated Electronics',
    description: 'Product group nomining yangilangan holati',
  })
  @IsOptional()
  @IsString()
  name?: string;
}
