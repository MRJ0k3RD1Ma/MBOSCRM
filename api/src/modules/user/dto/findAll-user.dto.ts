import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

export class FindAllUserQueryDto extends PaginationDto {
  @ApiPropertyOptional({ example: 'John' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: '+998910123456' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: 'admin' })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({ example: 'active' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  roleId?: number;

  @ApiPropertyOptional({ example: 'true' })
  @IsOptional()
  @IsString()
  chatId?: string;
}
