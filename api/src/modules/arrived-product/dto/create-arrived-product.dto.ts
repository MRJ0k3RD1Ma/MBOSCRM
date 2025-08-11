import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { IsId } from 'src/common/dtos/id.dto';

export class CreateArrivedProductDto {
  @IsId(false)
  arrivedId?: number;

  @IsId()
  productId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  count: number;
}
