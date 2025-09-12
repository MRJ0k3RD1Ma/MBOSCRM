import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class UpdateSettingsDto {
	@ApiPropertyOptional()
	@IsOptional()
	@IsNumber()
	balance: number;

	@ApiPropertyOptional()
	@IsOptional()
	@IsNumber()
	creditReminderInterval: number;

	@ApiPropertyOptional()
	@IsOptional()
	@IsNumber()
	smsExpiredHour: number;

	@ApiPropertyOptional()
	@IsOptional()
	@IsNumber()
	smsPrice: number;
}
