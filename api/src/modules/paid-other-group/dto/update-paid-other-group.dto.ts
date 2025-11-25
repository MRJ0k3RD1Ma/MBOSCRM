import { IsName } from '../../../common/dtos/name.dto';

export class UpdatePaidOtherGroupDto {
  @IsName(false)
  name?: string;
}
