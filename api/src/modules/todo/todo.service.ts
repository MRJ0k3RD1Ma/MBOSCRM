import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllTodoDto } from './dto/finAll-todo.dto';
import { HttpError } from 'src/common/exception/http.error';

@Injectable()
export class TodoService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }
  async create(createTodoDto: CreateTodoDto) {
    let todo = await this.prisma.todo.findFirst({
      where: { name: createTodoDto.name },
    });

    if (!todo) {
      todo = await this.prisma.todo.create({
        data: {
          name: createTodoDto.name,
        },
      });
    }
    return todo;
  }

  async findAll(dto: FindAllTodoDto) {
    const todo = this.prisma.todo.findMany({
      where: {
        name: {
          contains: dto.name?.trim() || '',
          mode: 'insensitive',
        },
      },
    })
    return todo
  }

}
