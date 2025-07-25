import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

export class FindAllClientTypeQueryDto extends PaginationDto {
  @ApiPropertyOptional({ example: 'John' })
  @IsOptional()
  @IsString()
  name?: string;
}
