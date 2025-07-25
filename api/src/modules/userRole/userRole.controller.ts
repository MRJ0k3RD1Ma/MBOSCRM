import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { Role } from 'src/common/auth/roles/role.enum';
import { UserRoleService } from './userRole.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { FindAllUserRoleQueryDto } from './dto/findAll-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';

@Controller('user/role')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Post()
  @DecoratorWrapper('Create UserRole', true, [Role.Admin])
  create(@Body() createUserRoleDto: CreateUserRoleDto) {
    return this.userRoleService.create(createUserRoleDto);
  }

  @Get()
  @DecoratorWrapper('Get All UserRoles', true, [Role.Admin])
  findAll(@Query() query: FindAllUserRoleQueryDto) {
    return this.userRoleService.findAll(query);
  }

  @Get(':id')
  @DecoratorWrapper('Get UserRole by ID', true, [Role.Admin])
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.userRoleService.findOne(+id);
  }

  @Patch(':id')
  @DecoratorWrapper('Update UserRole', true, [Role.Admin])
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ) {
    return this.userRoleService.update(+id, updateUserRoleDto);
  }

  @Delete(':id')
  @DecoratorWrapper('Delete UserRole', true, [Role.Admin])
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.userRoleService.remove(+id);
  }
}
