import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({ example: 'Finish the report' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
