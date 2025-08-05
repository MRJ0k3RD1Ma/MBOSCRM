import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateProductGroupDto {
  @ApiProperty({
    example: 'Electronics',
    description: 'Product group nomi',
  })
  @IsString()
  name: string;
}
