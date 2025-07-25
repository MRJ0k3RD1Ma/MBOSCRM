import { IsName } from 'src/common/dtos/name.dto';

export class CreateUserRoleDto {
  @IsName()
  name: string;
}
