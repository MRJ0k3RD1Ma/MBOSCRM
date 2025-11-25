import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsOptional } from "class-validator";
import { IsName } from "../../../common/dtos/name.dto";

export class UpdateSimCardDto {
	@IsName(false)
	description: string;

	@IsName(false)
	company: string;

	@ApiPropertyOptional()
	@IsOptional()
	@IsBoolean()
	isActive: boolean;

	@ApiPropertyOptional()
	@IsOptional()
	@IsDate()
	@Type(() => Date)
	activeDate: Date;

	@IsName(false)
	phoneNumber: string;
}
