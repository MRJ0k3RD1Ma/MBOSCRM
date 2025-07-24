import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FindAllUserQueryDto } from './dto/findAll-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshUserDto } from './dto/refresh-user.dto';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { Role } from 'src/common/auth/roles/role.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @DecoratorWrapper('Register User')
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
  @DecoratorWrapper('User Logout', true, [Role.User])
  logout(@Req() req: any) {
    return this.userService.logout(req.user.id);
  }

  @Get()
  @DecoratorWrapper('Get All Users', true, [Role.User])
  findAll(@Query() query: FindAllUserQueryDto) {
    return this.userService.findAll(query);
  }

  @Get(':id')
  @DecoratorWrapper('Get User by ID', true, [Role.User])
  findOne(@Param('id',ParseIntPipe) id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @DecoratorWrapper('Update User', true, [Role.User])
  update(
    @Param('id',ParseIntPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: any,
  ) {
    return this.userService.update(+id, updateUserDto, req.user.id);
  }

  // @Delete(':id')
  // @DecoratorWrapper('Delete User', true, [Role.User])
  // remove(@Param('id',ParseIntPipe) id: string) {
  //   return this.userService.remove(+id);
  // }
}
