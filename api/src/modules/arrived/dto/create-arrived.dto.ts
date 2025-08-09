import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString, ValidateNested } from 'class-validator';
import { IsId } from 'src/common/dtos/id.dto';
import { CreateArrivedProductDto } from 'src/modules/arrived-product/dto/create-arrived-product.dto';

export class CreateArrivedDto {
  @ApiPropertyOptional({ example: '2025-07-29T12:12:44.882Z' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date?: Date;

  @ApiPropertyOptional({ example: 'WB123456' })
  @IsOptional()
  @IsString()
  waybillNumber?: string;

  @IsId()
  supplierId: number;

  @ApiPropertyOptional({ example: 'Qisqacha izoh' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: [
      {
        productId: 1,
        count: 1,
      },
    ],
  })
  @ValidateNested({ each: true })
  products: CreateArrivedProductDto[];
}
