import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { FindAllTodoDto } from './dto/finAll-todo.dto';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @DecoratorWrapper('createTodo')
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  @DecoratorWrapper('getTodos')
  findAll(@Query() dto: FindAllTodoDto) {
    return this.todoService.findAll(dto);
  }
}
