import { IsName } from '../../../common/dtos/name.dto';

export class CreateClientTypeDto {
  @IsName()
  name: string;
}
