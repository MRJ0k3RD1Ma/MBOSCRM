import { IsId } from 'src/common/dtos/id.dto';
import { IsName } from 'src/common/dtos/name.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

export class FindAllClientQueryDto extends PaginationDto {
  @IsName(false)
  name?: string;

  @IsName(false)
  address?: string;

  @IsName(false)
  description?: string;

  @IsName(false)
  phone?: string;

  @IsName(false)
  inn?: string;

  @IsId(false)
  regionId: number;

  @IsId(false)
  districtId: number;
}
