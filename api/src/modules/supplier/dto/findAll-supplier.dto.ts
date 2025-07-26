import { IsName } from 'src/common/dtos/name.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

export class FindAllSupplierQueryDto extends PaginationDto {
  @IsName(false)
  name?: string;

  @IsName(false)
  description?: string;

  @IsName(false)
  phone?: string;
}
