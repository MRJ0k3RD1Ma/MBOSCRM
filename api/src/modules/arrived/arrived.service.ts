import { Injectable } from '@nestjs/common';
import { CreateArrivedDto } from './dto/create-arrived.dto';
import { UpdateArrivedDto } from './dto/update-arrived.dto';
import { PrismaService } from '../prisma/prisma.service';
import { HttpError } from '../../common/exception/http.error';
import { FindAllArrivedQueryDto } from './dto/findAll-arrived-query.dto';
import { Arrived, Prisma, Supplier } from '@prisma/client';
import { ArrivedProductService } from '../arrived-product/arrived-product.service';
import { env } from '../../common/config';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { InjectBot } from '@grammyjs/nestjs';
import { Bot, Context } from 'grammy';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(timezone);

@Injectable()
export class ArrivedService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly arrivedProductService: ArrivedProductService,
    private readonly eventEmitter: EventEmitter2,
    @InjectBot() private readonly bot: Bot<Context>,
  ) {}

  @OnEvent('recalculate.arrived')
  async recalculate(arrivedId: number) {
    const arrivedProductAgg = await this.prisma.arrivedProduct.aggregate({
      _sum: { priceCount: true },
      where: { arrivedId, isDeleted: false },
    });

    const arrivedPrice = arrivedProductAgg._sum.priceCount || 0;

    const arrived = await this.prisma.arrived.update({
      where: { id: arrivedId },
      data: { price: arrivedPrice },
    });

    this.eventEmitter.emit('recalculate.supplier', arrived.supplierId);
  }

  async onModuleInit() {
    (async () => {
      const arriveds = await this.prisma.arrived.findMany({
        where: { isDeleted: false },
        select: { id: true },
      });
      for (const arrived of arriveds) {
        await this.recalculate(arrived.id);
      }
    })();

    if (env.ENV != 'prod') {
      const count = await this.prisma.arrived.count();
      const requiredCount = 5;
      if (count < requiredCount) {
        const supplier = await this.prisma.supplier.findFirst({
          where: { isDeleted: false },
        });
        for (let i = count; i < requiredCount; i++) {
          await this.create(
            {
              supplierId: supplier.id,
              date: new Date(),
              description: 'description asdfghj',
              products: [{ count: 1, productId: 1 }],
            },
            1,
          );
        }
      }
    }
  }

  async sendNotification(arrivedId: number) {
    const arrived = await this.prisma.arrived.findFirst({
      where: { id: arrivedId, isDeleted: false },
      include: {
        supplier: true,
        ArrivedProduct: { include: { Product: true } },
        register: true,
      },
    });
    if (!arrived) return;

    const message = `
Приход тавара

${arrived.ArrivedProduct.map((v) => `${v.count}x ${v.Product.name}- ${v.priceCount} So'm`).join('\n')}

Yetkazuvchi: ${arrived.supplier.name}

Kiritdi: ${arrived.register.name}

Vaqt: ${dayjs(arrived.date).format('DD-MM-YYYY')}
    `;

    const users = await this.prisma.user.findMany({});

    for (const user of users) {
      if (!user.chatId) continue;
      try {
        await this.bot.api.sendMessage(user.chatId, message);
      } catch (e) {
        console.log(e);
      }
    }
  }

  async create(createArrivedDto: CreateArrivedDto, creatorId: number) {
    const { date, waybillNumber, supplierId, description, products } =
      createArrivedDto;

    const existingSupplier = await this.prisma.supplier.findFirst({
      where: { id: supplierId, isDeleted: false },
    });

    if (!existingSupplier) {
      throw new HttpError({
        message: `Supplier with ID ${supplierId} not found`,
      });
    }

    const maxCode = await this.prisma.arrived.findFirst({
      where: {
        created: {
          lt: new Date(new Date().getFullYear(), 11),
          gt: new Date(new Date().getFullYear(), 0),
        },
      },
      orderBy: { codeId: 'desc' },
    });

    const codeId = (maxCode?.codeId || 0) + 1;

    let arrived = await this.prisma.arrived.create({
      data: {
        date,
        code: `${new Date().getFullYear() - 2000}-${codeId}`,
        codeId,
        waybillNumber,
        supplierId,
        description,
        registerId: creatorId,
        modifyId: creatorId,
      },
    });

    let totalPrice = 0;
    for (const product of products) {
      const arrivedProduct = await this.arrivedProductService.create(
        {
          arrivedId: arrived.id,
          count: product.count,
          price: product.price,
          productId: product.productId,
        },
        creatorId,
      );
      totalPrice += arrivedProduct.priceCount;
    }

    await this.prisma.supplier.update({
      where: { id: supplierId },
      data: { balance: { decrement: totalPrice } },
    });
    arrived = await this.prisma.arrived.update({
      where: { id: arrived.id },
      data: { price: totalPrice },
      include: { ArrivedProduct: { include: { Product: true } } },
    });

    this.recalculate(arrived.id);
    this.sendNotification(arrived.id);

    return arrived;
  }

  async findAll(dto: FindAllArrivedQueryDto) {
    const {
      limit = 10,
      page = 1,
      minPrice,
      maxPrice,
      fromDate,
      toDate,
      supplierId,
      code,
    } = dto;

    const where: Prisma.ArrivedWhereInput = {
      isDeleted: false,
    };

    if (supplierId !== undefined) {
      where.supplierId = supplierId;
    }

    if (code) {
      where.code = {
        startsWith: code,
        mode: 'insensitive',
      };
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {
        ...(minPrice !== undefined && { gte: minPrice }),
        ...(maxPrice !== undefined && { lte: maxPrice }),
      };
    }

    if (fromDate || toDate) {
      where.date = {
        ...(fromDate && { gte: fromDate }),
        ...(toDate && { lte: toDate }),
      };
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.arrived.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        include: { ArrivedProduct: true, register: true, supplier: true },
        orderBy: { id: 'desc' },
      }),
      this.prisma.arrived.count({ where }),
    ]);

    return {
      total,
      page,
      limit,
      data,
    };
  }

  async findOne(id: number) {
    const arrived = await this.prisma.arrived.findFirst({
      where: {
        id,
        isDeleted: false,
      },
      include: { ArrivedProduct: true, register: true, supplier: true },
    });
    if (!arrived) {
      throw new HttpError({
        message: `Arrived with ID ${id} not found`,
      });
    }
    return arrived;
  }

  async update(
    id: number,
    updateArrivedDto: UpdateArrivedDto,
    modifyId: number,
  ) {
    const arrived = await this.prisma.arrived.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });
    if (!arrived) {
      throw new HttpError({
        message: `Arrived with ID ${id} not found`,
      });
    }

    let totalPrice = 0;
    for (let product of updateArrivedDto.products) {
      const currentArrivedProdcut = await this.prisma.arrivedProduct.findFirst({
        where: { arrivedId: arrived.id, productId: product.productId },
      });
      let arrivedProduct: any;
      if (currentArrivedProdcut) {
        arrivedProduct = await this.arrivedProductService.update(
          currentArrivedProdcut.id,
          {
            count: product.count || currentArrivedProdcut.count,
            price: product.price || currentArrivedProdcut.price,
            productId: product.productId || currentArrivedProdcut.productId,
          },
        );
      } else {
        arrivedProduct = await this.arrivedProductService.create(
          {
            count: product.count || currentArrivedProdcut.count,
            price: product.price || currentArrivedProdcut.price,
            productId: product.productId || currentArrivedProdcut.productId,
          },
          modifyId,
        );
      }
      totalPrice += arrivedProduct.priceCount;
    }
    await this.prisma.arrivedProduct.deleteMany({
      where: {
        arrivedId: arrived.id,
        productId: { notIn: updateArrivedDto.products.map((v) => v.productId) },
      },
    });

    return this.prisma.arrived.update({
      where: { id },
      data: {
        date: updateArrivedDto.date ?? arrived.date,
        waybillNumber: updateArrivedDto.waybillNumber ?? arrived.waybillNumber,
        supplierId: updateArrivedDto.supplierId ?? arrived.supplierId,
        description: updateArrivedDto.description ?? arrived.description,
        price: totalPrice,
      },
      include: {
        ArrivedProduct: { include: { Product: true } },
        modify: true,
        register: true,
        supplier: true,
      },
    });
  }

  async remove(id: number) {
    let arrived: any = await this.prisma.arrived.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });
    if (!arrived) {
      throw new HttpError({
        message: `Arrived with ID ${id} not found`,
      });
    }
    arrived = this.prisma.arrived.update({
      where: { id },
      data: { isDeleted: true },
    });

    this.eventEmitter.emit('recalculate.supplier', arrived.supplierId);

    return arrived;
  }
}
