import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsOptional } from "class-validator";
import { IsId } from "../../../common/dtos/id.dto";
import { IsName } from "../../../common/dtos/name.dto";
import { PaginationDto } from "../../../common/dtos/pagination.dto";

export class FindAllSimCardQueryDto extends PaginationDto {
	@IsId(false)
	clientId: number;

	@IsName(false)
	phoneNumber: string;

	@IsName(false)
	company: string;

	@IsName(false)
	description: string;

	@ApiPropertyOptional()
	@IsOptional()
	@IsBoolean()
	isActive: boolean;
}
