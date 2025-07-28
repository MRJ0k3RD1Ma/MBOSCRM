import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNumber } from 'class-validator';
import { IsId } from 'src/common/dtos/id.dto';

export class CreatePaidSupplierDto {
  @IsId()
  supplierId: number;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  paidDate: Date;

  @ApiProperty()
  @IsNumber()
  price: number;

  @IsId()
  paymentId: number;
}
