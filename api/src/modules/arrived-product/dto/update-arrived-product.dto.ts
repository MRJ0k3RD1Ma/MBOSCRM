import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, Min } from "class-validator";
import { IsId } from "src/common/dtos/id.dto";

export class UpdateArrivedProductDto {
	@ApiPropertyOptional()
	@IsOptional()
	@IsNumber()
	@Min(1)
	count?: number;

	@ApiPropertyOptional()
	@IsOptional()
	@IsNumber()
	price?: number;

	@IsId(false)
	productId?: number;
}
