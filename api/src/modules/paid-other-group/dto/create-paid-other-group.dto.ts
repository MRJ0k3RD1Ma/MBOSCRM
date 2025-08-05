import { IsName } from 'src/common/dtos/name.dto';

export class CreatePaidOtherGroupDto {
  @IsName()
  name: string;
}
