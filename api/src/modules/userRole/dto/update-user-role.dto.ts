import { IsName } from '../../../common/dtos/name.dto';

export class UpdateUserRoleDto {
  @IsName(false)
  name?: string;
}
