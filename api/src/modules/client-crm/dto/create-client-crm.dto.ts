import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsOptional, Matches } from "class-validator";
import { IsId } from "src/common/dtos/id.dto";
import { IsName } from "src/common/dtos/name.dto";

export class CreateClientCrmDto {
	@IsId()
	clientId: number;

	@IsName()
	domain: string;

	@ApiPropertyOptional()
	@IsOptional()
	@IsBoolean()
	isFullAccess: boolean;

	@ApiPropertyOptional()
	@IsOptional()
	@IsDate()
	@Type(() => Date)
	expiredFullAccess: Date;
}
