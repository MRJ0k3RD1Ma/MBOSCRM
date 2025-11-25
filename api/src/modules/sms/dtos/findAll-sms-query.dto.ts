import { IsName } from "../../../common/dtos/name.dto";
import { PaginationDto } from "../../../common/dtos/pagination.dto";

export class FindAllSmsQueryDto extends PaginationDto {
	@IsName(false)
	message?: string;
}
