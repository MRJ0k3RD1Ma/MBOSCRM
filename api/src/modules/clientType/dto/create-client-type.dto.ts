import { IsName } from 'src/common/dtos/name.dto';

export class CreateClientTypeDto {
  @IsName()
  name: string;
}
