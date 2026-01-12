import { Injectable } from '@nestjs/common';
import { CreateSaleTodoDto } from './dto/create-sale-todo.dto';
import { UpdateSaleTodoDto } from './dto/update-sale-todo.dto';
import { PrismaService } from '../prisma/prisma.service';
import { HttpError } from '../../common/exception/http.error';
import { FindAllSaleTodoDto } from './dto/findAll-sale-todo.dto';
import { Prisma, SaleFeedbackResult, SaleFeedbackState } from '@prisma/client';
import { TodoService } from '../todo/todo.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SaleTodoService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly todo: TodoService,
  ) {}

  async create(createSaleTodoDto: CreateSaleTodoDto, user: number) {
    const sale = await this.prisma.sale.findFirst({
      where: { id: createSaleTodoDto.saleId, isDeleted: false },
      include: { SaleFeedback: true },
    });

    if (!sale) {
      throw new HttpError({ message: 'Sale not found' });
    }

    let feedbackId: number;
    if (sale.SaleFeedback) {
      feedbackId = sale.SaleFeedback.id;
    } else {
      const newFeedback = await this.prisma.saleFeedback.create({
        data: {
          saleId: sale.id,
          alias: uuidv4(),
          state: SaleFeedbackState.TODO,
          result: SaleFeedbackResult.NOT_COMPLETED,
          score: 0,
        },
      });
      feedbackId = newFeedback.id;
    }

    return this.prisma.saleTodo.create({
      data: {
        name: createSaleTodoDto.name,
        saleId: sale.id,
        feedbackId,
        registerId: user,
        modifyId: user,
      },
    });
  }

  async findAll(dto: FindAllSaleTodoDto) {
    const { page = 1, limit = 10, name, isCompleted, saleId, feedbackId } = dto;

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

  async update(id: number, updateSaleTodoDto: UpdateSaleTodoDto) {
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

    return this.prisma.saleTodo.update({
      where: { id },
      data: {
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
