import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsOptional } from 'class-validator';
import { IsId } from '../../../common/dtos/id.dto';
import { IsName } from '../../../common/dtos/name.dto';

export class UpdateClientCrmDto {
  @IsId(false)
  productId: number;

  @IsName(false)
  domain: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isFullAccess: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  expiredFullAccess: Date;
}
