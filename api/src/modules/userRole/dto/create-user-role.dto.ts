import { IsName } from '../../../common/dtos/name.dto';

export class CreateUserRoleDto {
  @IsName()
  name: string;
}
