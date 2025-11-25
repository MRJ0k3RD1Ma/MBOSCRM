import { IsName } from '../../../common/dtos/name.dto';

export class CreatePaidOtherGroupDto {
  @IsName()
  name: string;
}
