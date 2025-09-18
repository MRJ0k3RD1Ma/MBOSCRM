import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsOptional, Matches } from 'class-validator';
import { IsId } from 'src/common/dtos/id.dto';
import { IsName } from 'src/common/dtos/name.dto';

export class CreateClientCrmDto {
  @IsId()
  clientId: number;

  @IsId(false)
  productId: number;

  @IsName()
  domain: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isFullAccess: boolean;

  @ApiPropertyOptional({
    example: '2025-07-29T12:12:44.882Z',
    description: 'ISO 8601 formatda vaqt',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  expiredFullAccess: Date;
}
