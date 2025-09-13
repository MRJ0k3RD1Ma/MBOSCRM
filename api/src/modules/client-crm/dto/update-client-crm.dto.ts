import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsOptional } from "class-validator";
import { IsId } from "src/common/dtos/id.dto";
import { IsName } from "src/common/dtos/name.dto";

export class UpdateClientCrmDto {
	@IsName(false)
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
