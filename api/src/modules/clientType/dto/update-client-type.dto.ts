import { IsName } from '../../../common/dtos/name.dto';

export class UpdateClientTypeDto {
  @IsName(false)
  name?: string;
}
