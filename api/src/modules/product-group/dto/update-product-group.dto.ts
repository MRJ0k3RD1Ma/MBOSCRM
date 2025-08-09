import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateProductGroupDto {
  @ApiPropertyOptional({
    example: 'Updated Electronics',
    description: 'Product group nomining yangilangan holati',
  })
  @IsOptional()
  @IsString()
  name?: string;
}
