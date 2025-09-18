import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { env } from 'src/common/config';
import { faker } from '@faker-js/faker';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class SaleTodoService {
  constructor(private readonly prisma: PrismaService) {}

  private searchCache: Map<string, string> = new Map();

  async onModuleInit() {
    if (env.ENV != 'prod') {
      const count = await this.prisma.todo.count();
      const requiredCount = 10000;
      if (count < requiredCount) {
        for (let i = count; i < requiredCount; i++) {
          await this.createTodo({
            name: faker.word.words(10),
          });
        }
      }
    }
  }

  async createTodo(createTodoDto: CreateTodoDto) {
    const todo = await this.prisma.todo.create({
      data: {
        name: createTodoDto.name,
      },
    });
    return todo;
  }

  async searchTodo(query: string) {
    const cache = this.searchCache.get(query);
    if (cache) return cache;
    const todos = await this.prisma.todo.findMany({
      where: { name: { contains: query, mode: 'insensitive' } },
      take: 10,
    });

    this.searchCache.set(query, JSON.stringify(todos));
    return todos;
  }
}
