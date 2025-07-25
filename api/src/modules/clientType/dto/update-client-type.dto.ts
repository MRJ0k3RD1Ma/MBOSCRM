import { IsName } from 'src/common/dtos/name.dto';

export class UpdateClientTypeDto {
  @IsName(false)
  name?: string;
}
