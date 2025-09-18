import { IsId } from 'src/common/dtos/id.dto';
import { IsName } from 'src/common/dtos/name.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

export class FindAllSmsQueryDto extends PaginationDto {
  @IsName(false)
  message?: string;

  @IsId(false)
  crmId: number;
}
