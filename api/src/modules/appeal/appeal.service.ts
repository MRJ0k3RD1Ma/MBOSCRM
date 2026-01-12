import { Injectable } from '@nestjs/common';
import { CreateAppealDto } from './dto/create-appeal.dto';
import { UpdateAppealDto } from './dto/update-appeal.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllAppealDto } from './dto/findAll-appeal.dto';
import { HttpError } from '../../common/exception/http.error';

@Injectable()
export class AppealService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createAppealDto: CreateAppealDto) {
    const appeal = await this.prisma.appeal.create({
      data: {
        name: createAppealDto.name,
        phone: createAppealDto.phone,
        subject: createAppealDto.subject,
        detail: createAppealDto.detail,
        state: createAppealDto.state,
      },
    });
    return appeal;
  }

  async findAll(dto: FindAllAppealDto) {
    const { page = 1, limit = 10 } = dto;
    const where = { isDeleted: false };
    const [data, total] = await this.prisma.$transaction([
      this.prisma.appeal.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { id: 'desc' },
      }),
      this.prisma.appeal.count({ where }),
    ]);

    return {
      total,
      page,
      limit,
      data,
    };
  }

  async findOne(id: number) {
    const appeal = await this.prisma.appeal.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });
    if (!appeal) {
      throw new HttpError({ code: 'appeal not found' });
    }
    return appeal;
  }

  async update(id: number, updateAppealDto: UpdateAppealDto, modifyId: number) {
    const appeal = await this.prisma.appeal.findFirst({
      where: {
        id: id,
        isDeleted: false,
      },
    });
    if (!appeal) {
      throw new HttpError({ code: 'appeal not found' });
    }
    const appealUpdate = await this.prisma.appeal.update({
      where: {
        id,
      },
      data: {
        name: updateAppealDto.name ?? appeal.name,
        phone: updateAppealDto.phone ?? appeal.phone,
        subject: updateAppealDto.subject ?? appeal.subject,
        detail: updateAppealDto.detail ?? appeal.detail,
        state: updateAppealDto.state ?? appeal.state,
        modifyId: modifyId,
      },
    });
    return appealUpdate;
  }

  async remove(id: number) {
    const appeal = await this.prisma.appeal.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });
    if (!appeal) {
      throw new HttpError({ code: 'appeal not found' });
    }
    return this.prisma.appeal.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });
  }
}
