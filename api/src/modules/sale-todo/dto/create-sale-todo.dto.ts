import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, MaxLength, IsBoolean } from 'class-validator';

export class CreateSaleTodoDto {
    @ApiProperty({
        example: 1
    })
    @IsInt()
    saleId?: number;

    @ApiProperty({
        example: 'Mijoz bilan qayta bog‘lanish',
    })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    name?: string;


}
