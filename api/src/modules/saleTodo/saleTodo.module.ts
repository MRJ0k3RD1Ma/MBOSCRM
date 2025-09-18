import { Module } from '@nestjs/common';
import { SaleTodoService } from './saleTodo.service';
import { SaleTodoController } from './saleTodo.controller';

@Module({
  controllers: [SaleTodoController],
  providers: [SaleTodoService],
})
export class SaleTodoModule {}
