import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateTodoDto {
	@ApiProperty({ example: "apple" })
	@IsString()
	name: string;
}
