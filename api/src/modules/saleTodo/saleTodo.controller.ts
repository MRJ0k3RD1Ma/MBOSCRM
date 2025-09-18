import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Role } from 'src/common/auth/roles/role.enum';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { ApiTags } from '@nestjs/swagger';
import { SaleTodoService } from './saleTodo.service';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller('sale-todo')
@ApiTags('saleTodo')
export class SaleTodoController {
  constructor(private readonly saleTodoService: SaleTodoService) {}

  @Post('/todo')
  @DecoratorWrapper('Create payment', true, [Role.Admin])
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.saleTodoService.createTodo(createTodoDto);
  }

  @Get('/todo/:query')
  @DecoratorWrapper('Search payment')
  searchTodo(@Param('query') query: string) {
    return this.saleTodoService.searchTodo(query);
  }
}
