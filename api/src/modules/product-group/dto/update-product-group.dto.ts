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

  @ApiPropertyOptional({
    example: true,
    description: 'Product group o‘chirilgan yoki yo‘qligini bildiradi',
  })
  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;
}
