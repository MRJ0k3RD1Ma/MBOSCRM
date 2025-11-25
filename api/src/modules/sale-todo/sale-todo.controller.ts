import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { SaleTodoService } from './sale-todo.service';
import { CreateSaleTodoDto } from './dto/create-sale-todo.dto';
import { UpdateSaleTodoDto } from './dto/update-sale-todo.dto';
import { DecoratorWrapper } from '../../common/auth/decorator.auth';
import { Role } from '../../common/auth/roles/role.enum';
import { Request } from 'express';
import { FindAllSaleTodoDto } from './dto/findAll-sale-todo.dto';

@Controller('sale-todo')
export class SaleTodoController {
  constructor(private readonly saleTodoService: SaleTodoService) {}

  @Post()
  @DecoratorWrapper('createSaleTodo', true, [Role.Admin])
  create(@Body() createSaleTodoDto: CreateSaleTodoDto, @Req() req: Request) {
    const user = req.user.id;
    return this.saleTodoService.create(createSaleTodoDto, user);
  }

  @Get()
  @DecoratorWrapper('findAllSaleTodo')
  findAll(@Query() dto: FindAllSaleTodoDto) {
    return this.saleTodoService.findAll(dto);
  }

  @Get(':id')
  @DecoratorWrapper('findOneSaleTodo')
  findOne(@Param('id') id: string) {
    return this.saleTodoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSaleTodoDto: UpdateSaleTodoDto,
  ) {
    return this.saleTodoService.update(+id, updateSaleTodoDto);
  }

  @Delete(':id')
  @DecoratorWrapper('removeSaleTodo', true, [Role.Admin])
  remove(@Param('id') id: string) {
    return this.saleTodoService.remove(+id);
  }
}
