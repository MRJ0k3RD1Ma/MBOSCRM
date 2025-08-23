import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { IsId } from 'src/common/dtos/id.dto';
import { UpdateArrivedProductDto } from 'src/modules/arrived-product/dto/update-arrived-product.dto';

export class UpdateArrivedDto {
  @ApiPropertyOptional({ example: '2025-07-29T12:12:44.882Z' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date?: Date;

  @ApiPropertyOptional({ example: 'WB123456' })
  @IsOptional()
  @IsString()
  waybillNumber?: string;

  @ApiPropertyOptional({ example: 3 })
  @IsOptional()
  @IsId()
  supplierId?: number;

  @ApiPropertyOptional({ example: 'Qisqacha izoh' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: [
      {
        productId: 1,
        count: 1,
      },
    ],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  products: UpdateArrivedProductDto[];
}
