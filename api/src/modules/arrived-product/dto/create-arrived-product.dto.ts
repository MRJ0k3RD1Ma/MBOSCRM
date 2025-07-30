import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';
import { IsId } from 'src/common/dtos/id.dto';

export class CreateArrivedProductDto {
  @IsId(false)
  arrivedId?: number;

  @IsId()
  productId: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  count: number;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNumber()
  priceCount: number;
}
