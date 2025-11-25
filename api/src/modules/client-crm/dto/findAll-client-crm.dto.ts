import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';
import { IsId } from '../../../common/dtos/id.dto';
import { IsName } from '../../../common/dtos/name.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

export class FindAllClientCrmQueryDto extends PaginationDto {
  @IsId(false)
  clientId: number;

  @IsName(false)
  domain: string;

  @IsName(false)
  key: string;
}
