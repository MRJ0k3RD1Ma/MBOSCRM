import { IsName } from 'src/common/dtos/name.dto';

export class UpdateUserRoleDto {
  @IsName(false)
  name?: string;
}
