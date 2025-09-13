import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateSaleTodoDto } from './create-sale-todo.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateSaleTodoDto extends PartialType(CreateSaleTodoDto) {
    @ApiPropertyOptional({
        example: true
    })
    @IsOptional()
    @IsBoolean()
    isCompleted?: boolean;
}
