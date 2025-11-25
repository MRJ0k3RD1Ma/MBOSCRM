import { IsName } from '../../../common/dtos/name.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

export class FindAllQueryServer extends PaginationDto {
  @IsName(false)
  name?: string;

  @IsName(false)
  responsible?: string;

  @IsName(false)
  plan?: string;
}
