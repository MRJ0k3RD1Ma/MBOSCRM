import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

export class FindAllTodoDto {
  @ApiPropertyOptional({ example: 'report' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;
}
