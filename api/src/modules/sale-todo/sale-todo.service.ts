import { Injectable } from '@nestjs/common';
import { CreateSaleTodoDto } from './dto/create-sale-todo.dto';
import { UpdateSaleTodoDto } from './dto/update-sale-todo.dto';
import { PrismaService } from '../prisma/prisma.service';
import { HttpError } from 'src/common/exception/http.error';
import { FindAllSaleTodoDto } from './dto/findAll-sale-todo.dto';
import { Prisma } from '@prisma/client';
import { TodoService } from '../todo/todo.service';

@Injectable()
export class SaleTodoService {
  constructor(private readonly prisma: PrismaService, private readonly todo: TodoService) { }

  async create(createSaleTodoDto: CreateSaleTodoDto, user: number) {
    if (createSaleTodoDto.saleId) {
      const sale = await this.prisma.sale.findFirst({
        where: { id: createSaleTodoDto.saleId, isDeleted: false },
      });
      if (!sale) {
        throw new HttpError({ message: 'Sale not found' });
      }
    }

    if (createSaleTodoDto.feedbackId) {
      const feedback = await this.prisma.saleFeedback.findFirst({
        where: { id: createSaleTodoDto.feedbackId, isDeleted: false },
      });
      if (!feedback) {
        throw new HttpError({ message: 'Feedback not found' });
      }
    }

    const todo = await this.todo.create({
      name: createSaleTodoDto.name,
    });

    return this.prisma.saleTodo.create({
      data: {
        name: todo.name,
        saleId: createSaleTodoDto.saleId,
        feedbackId: createSaleTodoDto.feedbackId,
        registerId: user,
        modifyId: user,
      },
    });
  }

  async findAll(dto: FindAllSaleTodoDto) {
    const { page, limit, name, isCompleted, saleId, feedbackId } = dto;

    const where: Prisma.SaleTodoWhereInput = { isDeleted: false };

    if (name) {
      where.name = { contains: name, mode: 'insensitive' };
    }
    if (isCompleted !== undefined) {
      where.isCompleted = isCompleted;
    }
    if (saleId) {
      where.saleId = saleId;
    }
    if (feedbackId) {
      where.feedbackId = feedbackId;
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.saleTodo.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.saleTodo.count({ where }),
    ]);

    return { data, total, page, limit };
  }

  async findOne(id: number) {
    const saleTodo = await this.prisma.saleTodo.findFirst({
      where: { id, isDeleted: false },
    });
    if (!saleTodo) {
      throw new HttpError({ message: 'SaleTodo not found' });
    }
    return saleTodo;
  }

  async update(id: number, updateSaleTodoDto: UpdateSaleTodoDto,) {
    const saleTodo = await this.prisma.saleTodo.findFirst({
      where: { id, isDeleted: false },
    });
    if (!saleTodo) {
      throw new HttpError({ message: 'SaleTodo not found' });
    }

    if (updateSaleTodoDto.saleId) {
      const sale = await this.prisma.sale.findFirst({
        where: { id: updateSaleTodoDto.saleId, isDeleted: false },
      });
      if (!sale) {
        throw new HttpError({ message: 'Sale not found' });
      }
    }

    if (updateSaleTodoDto.feedbackId) {
      const feedback = await this.prisma.saleFeedback.findFirst({
        where: { id: updateSaleTodoDto.feedbackId, isDeleted: false },
      });
      if (!feedback) {
        throw new HttpError({ message: 'Feedback not found' });
      }
    }

    return this.prisma.saleTodo.update({
      where: { id },
      data: {
        feedbackId: updateSaleTodoDto.feedbackId ?? saleTodo.feedbackId,
        saleId: updateSaleTodoDto.saleId ?? saleTodo.saleId,
        name: updateSaleTodoDto.name ?? saleTodo.name,
        isCompleted: updateSaleTodoDto.isCompleted ?? saleTodo.isCompleted,
        updatedAt: new Date(),
      },
    });
  }

  async remove(id: number) {
    const saleTodo = await this.prisma.saleTodo.findFirst({
      where: { id, isDeleted: false },
    });
    if (!saleTodo) {
      throw new HttpError({ message: 'SaleTodo not found' });
    }

    await this.prisma.saleTodo.update({
      where: { id },
      data: { isDeleted: true, updatedAt: new Date() },
    });

    return { message: `SaleTodo #${id} removed successfully` };
  }
}
