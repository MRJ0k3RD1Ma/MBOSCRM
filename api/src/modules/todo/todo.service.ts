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
    const todo = await this.prisma.todo.create({
      data: {
        name: createTodoDto.name,
      }
    })
    return todo;
  }

  async findAll(dto: FindAllTodoDto) {
    const { page, limit, name } = dto;
    const [data, total] = await this.prisma.$transaction([
      this.prisma.todo.findMany({
        where: {
          name: {
            contains: name?.trim() || '',
            mode: 'insensitive',
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { id: 'desc' },
      }),
      this.prisma.todo.count({
        where: {
          name: {
            contains: name?.trim() || '',
            mode: 'insensitive',
          },
        },
      }),
    ]);
    return {
      total,
      page,
      limit,
      data,
    };
  }

}
