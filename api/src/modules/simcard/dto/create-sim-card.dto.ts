import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsDate } from "class-validator";
import { IsId } from "../../../common/dtos/id.dto";
import { IsName } from "../../../common/dtos/name.dto";

export class CreateSimCardDto {
	@IsId()
	clientId: number;

	@IsName()
	description: string;

	@IsName()
	company: string;

	@ApiProperty()
	@IsBoolean()
	isActive: boolean;

	@ApiProperty({
		example: "2025-07-29T12:12:44.882Z",
		description: "ISO 8601 formatda vaqt",
	})
	@IsDate()
	@Type(() => Date)
	activeDate: Date;

	@IsName()
	phoneNumber: string;
}
