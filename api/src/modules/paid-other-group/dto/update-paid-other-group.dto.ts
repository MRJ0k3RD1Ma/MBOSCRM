import { IsName } from 'src/common/dtos/name.dto';

export class UpdatePaidOtherGroupDto {
  @IsName(false)
  name?: string;
}
