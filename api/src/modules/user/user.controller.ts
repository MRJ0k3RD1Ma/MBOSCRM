import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Req,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FindAllUserQueryDto } from './dto/findAll-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshUserDto } from './dto/refresh-user.dto';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { Role } from 'src/common/auth/roles/role.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @DecoratorWrapper('Create User', true, [Role.Admin])
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  @DecoratorWrapper('User Login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @Post('refresh')
  @DecoratorWrapper('Refresh User Token')
  refresh(@Body() refreshUserDto: RefreshUserDto) {
    return this.userService.refresh(refreshUserDto);
  }

  @Post('logout')
  @DecoratorWrapper('User Logout', true, [Role.Admin])
  logout(@Req() req: any) {
    return this.userService.logout(req.user.id);
  }

  @Get()
  @DecoratorWrapper('Get All Users', true, [Role.Admin])
  findAll(@Query() query: FindAllUserQueryDto) {
    return this.userService.findAll(query);
  }

  @Get('check')
  @DecoratorWrapper('Check Auth', true, [Role.Admin])
  async findMe(@Req() req: Request) {
    await this.userService.findOne(req.user.id);
    return { success: true };
  }

  @Get(':id')
  @DecoratorWrapper('Get User by ID', true, [Role.Admin])
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @DecoratorWrapper('Update User', true, [Role.Admin])
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @DecoratorWrapper('Delete User', true, [Role.User])
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.userService.remove(+id);
  }
}
