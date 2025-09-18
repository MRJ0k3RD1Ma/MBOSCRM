import { Module } from '@nestjs/common';
import { SaleTodoService } from './sale-todo.service';
import { SaleTodoController } from './sale-todo.controller';
import { TodoModule } from '../todo/todo.module';
import { TodoService } from '../todo/todo.service';

@Module({
  controllers: [SaleTodoController],
  providers: [SaleTodoService, TodoService],
})
export class SaleTodoModule {}
