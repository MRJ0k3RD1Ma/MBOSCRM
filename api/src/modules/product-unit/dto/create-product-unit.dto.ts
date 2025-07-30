import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateProductUnitDto {
  @ApiProperty({
    example: 'kg',
    description: 'Name of the product unit (e.g., kg, pcs, liter)',
  })
  @IsString()
  name: string;
}
