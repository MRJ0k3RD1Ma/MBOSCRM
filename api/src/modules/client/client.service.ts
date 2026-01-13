import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientType, Prisma, Sale } from '@prisma/client';
import { HttpError } from '../../common/exception/http.error';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { FindAllClientQueryDto } from './dto/findAll-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { env } from '../../common/config';
import { faker } from '@faker-js/faker';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class ClientService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  @OnEvent('recalculate.client')
  async recalculate(clientId: number) {
    const saleAgg = await this.prisma.sale.aggregate({
      where: { clientId, isDeleted: false },
      _sum: { price: true, credit: true, dept: true },
    });
    const paidClientAgg = await this.prisma.paidClient.aggregate({
      where: { clientId, isDeleted: false },
      _sum: { price: true },
    });
    const subscriptionAgg = await this.prisma.subscribe.aggregate({
      where: { clientId, isDeleted: false },
      _sum: { paid: true, price: true },
    });

    const paidClient = paidClientAgg._sum.price;
    const salePrice = saleAgg._sum.price;
    const subscriptionPaid = subscriptionAgg._sum.paid;
    const subscriptionPrice = subscriptionAgg._sum.price;
    const subscriptionCredit = subscriptionPrice - subscriptionPaid;

    const clientBalance =
      paidClient - salePrice - subscriptionPaid - subscriptionCredit;

    await this.prisma.client.update({
      where: { id: clientId },
      data: { balance: clientBalance },
    });
  }

  async onModuleInit() {
    (async () => {
      const clients = await this.prisma.client.findMany({
        where: { isDeleted: false },
        select: { id: true },
      });
      for (let client of clients) {
        await this.recalculate(client.id);
      }
    })();

    if (env.ENV != 'prod') {
      const clientCount = await this.prisma.client.count();
      const requiredCount = 3;
      if (clientCount < requiredCount) {
        for (let i = clientCount; i < requiredCount; i++) {
          await this.create(
            {
              balance: 0,
              address: faker.location.streetAddress(),
              description: faker.person.jobTitle(),
              districtId: 1733223,
              regionId: 1733,
              inn: faker.commerce.isbn(),
              name: faker.person.fullName(),
              phone: faker.phone.number(),
              typeId: 1,
            },
            1,
          );
        }
      }
    }
  }

  async create(createClientDto: CreateClientDto, creatorId: number) {
    const creator = await this.prisma.user.findFirst({
      where: { id: creatorId, isDeleted: false },
    });
    if (!creator) {
      throw HttpError({ message: 'Creator not found' });
    }

    if (createClientDto.districtId) {
      const district = await this.prisma.district.findUnique({
        where: { id: createClientDto.districtId },
      });
      if (!district) {
        throw HttpError({ code: 'District not found' });
      }
    }

    if (createClientDto.regionId) {
      const region = await this.prisma.region.findUnique({
        where: { id: createClientDto.regionId },
      });
      if (!region) {
        throw HttpError({ code: 'Region not found' });
      }
    }

    let type: ClientType;
    if (createClientDto.typeId) {
      type = await this.prisma.clientType.findFirst({
        where: { id: createClientDto.typeId, isDeleted: false },
      });
      if (!type) {
        throw HttpError({ code: 'type Not Found' });
      }
    }

    const client = await this.prisma.client.create({
      data: {
        name: createClientDto.name,
        address: createClientDto.address,
        description: createClientDto.description,
        inn: createClientDto.inn,
        typeId: type?.id,
        phone: createClientDto.phone,
        regionId: createClientDto?.regionId,
        districtId: createClientDto?.districtId,
        modifyId: creatorId,
        balance: createClientDto.balance || 0,
        registerId: creatorId,
      },
    });
    return client;
  }

  async findAll(dto: FindAllClientQueryDto) {
    const {
      limit = 10,
      page = 1,
      name,
      districtId,
      regionId,
      address,
      description,
      inn,
      phone,
      isPositiveBalance,
      fromDate,
      toDate,
      sortBy,
      sortOrder = 'desc',
    } = dto;

    const whereConditions: string[] = ['c."isDeleted" = false'];
    const params: any[] = [];
    let paramIndex = 1;

    if (name) {
      whereConditions.push(
        `(LOWER(c."name") LIKE LOWER($${paramIndex}) OR LOWER(c."inn") LIKE LOWER($${paramIndex}))`,
      );
      params.push(`%${name.trim()}%`);
      paramIndex++;
    }

    if (districtId !== undefined) {
      whereConditions.push(`c."districtId" = $${paramIndex}`);
      params.push(districtId);
      paramIndex++;
    }

    if (regionId !== undefined) {
      whereConditions.push(`c."regionId" = $${paramIndex}`);
      params.push(regionId);
      paramIndex++;
    }

    if (address?.trim()) {
      whereConditions.push(`LOWER(c."address") LIKE LOWER($${paramIndex})`);
      params.push(`%${address.trim()}%`);
      paramIndex++;
    }

    if (description?.trim()) {
      whereConditions.push(`LOWER(c."description") LIKE LOWER($${paramIndex})`);
      params.push(`%${description.trim()}%`);
      paramIndex++;
    }

    if (inn?.trim()) {
      whereConditions.push(`LOWER(c."inn") LIKE LOWER($${paramIndex})`);
      params.push(`%${inn.trim()}%`);
      paramIndex++;
    }

    if (phone?.trim()) {
      whereConditions.push(`LOWER(c."phone") LIKE LOWER($${paramIndex})`);
      params.push(`%${phone.trim()}%`);
      paramIndex++;
    }

    if (isPositiveBalance !== undefined) {
      if (isPositiveBalance) {
        whereConditions.push(`c."balance" >= 0`);
      } else {
        whereConditions.push(`c."balance" < 0`);
      }
    }

    const whereClause = whereConditions.join(' AND ');

    let dateFilterPaid = '';
    let dateFilterSale = '';
    let dateFilterSub = '';

    if (fromDate) {
      dateFilterPaid += ` AND pc."paid_date" >= $${paramIndex}`;
      dateFilterSale += ` AND s."date" >= $${paramIndex}`;
      dateFilterSub += ` AND sub."paying_date" >= $${paramIndex}`;
      params.push(fromDate);
      paramIndex++;
    }

    if (toDate) {
      dateFilterPaid += ` AND pc."paid_date" <= $${paramIndex}`;
      dateFilterSale += ` AND s."date" <= $${paramIndex}`;
      dateFilterSub += ` AND sub."paying_date" <= $${paramIndex}`;
      params.push(toDate);
      paramIndex++;
    }

    let orderByClause = 'c."id" DESC';
    if (sortBy) {
      const direction = sortOrder === 'asc' ? 'ASC' : 'DESC';
      if (sortBy === 'totalPaid') {
        orderByClause = `"totalPaid" ${direction} NULLS LAST`;
      } else if (sortBy === 'totalSale') {
        orderByClause = `"totalSale" ${direction} NULLS LAST`;
      } else if (sortBy === 'totalSub') {
        orderByClause = `"totalSubscription" ${direction} NULLS LAST`;
      } else if (sortBy === 'totalBalance') {
        orderByClause = `c."balance" ${direction} NULLS LAST`;
      }
    }

    const offset = (page - 1) * limit;
    params.push(limit, offset);
    const limitParam = paramIndex;
    const offsetParam = paramIndex + 1;

    const query = `
      SELECT
        c.*,
        json_build_object('id', ct."id", 'name', ct."name") as "ClientType",
        COALESCE(paid_agg."totalPaid", 0) as "totalPaid",
        COALESCE(sale_agg."totalSale", 0) as "totalSale",
        COALESCE(sub_agg."totalSubscription", 0) as "totalSubscription"
      FROM "client" c
      LEFT JOIN "client_type" ct ON c."typeId" = ct."id"
      LEFT JOIN LATERAL (
        SELECT COALESCE(SUM(pc."price"), 0) as "totalPaid"
        FROM "PaidClient" pc
        WHERE pc."client_id" = c."id"
          AND pc."isDeleted" = false
          ${dateFilterPaid}
      ) paid_agg ON true
      LEFT JOIN LATERAL (
        SELECT COALESCE(SUM(s."price"), 0) as "totalSale"
        FROM "Sale" s
        WHERE s."client_id" = c."id"
          AND s."isDeleted" = false
          ${dateFilterSale}
      ) sale_agg ON true
      LEFT JOIN LATERAL (
        SELECT COALESCE(SUM(sub."price"), 0) as "totalSubscription"
        FROM "Subscribe" sub
        WHERE sub."clientId" = c."id"
          ${dateFilterSub}
      ) sub_agg ON true
      WHERE ${whereClause}
      ORDER BY ${orderByClause}
      LIMIT $${limitParam} OFFSET $${offsetParam}
    `;

    const countQuery = `
      SELECT COUNT(*) as total
      FROM "client" c
      WHERE ${whereClause}
    `;

    const countParams = params.slice(0, -2);

    const [rawData, countResult] = await this.prisma.$transaction([
      this.prisma.$queryRawUnsafe<any[]>(query, ...params),
      this.prisma.$queryRawUnsafe<{ total: bigint }[]>(
        countQuery,
        ...countParams,
      ),
    ]);

    const data = rawData.map((row) => ({
      ...row,
      totalPaid: Number(row.totalPaid),
      totalSale: Number(row.totalSale),
      totalSubscription: Number(row.totalSubscription),
    }));

    const total = Number(countResult[0]?.total || 0);

    const where: Prisma.ClientWhereInput = { isDeleted: false };
    if (name) {
      where.OR = [
        { name: { contains: name.trim(), mode: 'insensitive' } },
        { inn: { contains: name.trim(), mode: 'insensitive' } },
      ];
    }
    if (districtId !== undefined) where.districtId = districtId;
    if (regionId !== undefined) where.regionId = regionId;
    if (address?.trim())
      where.address = { contains: address.trim(), mode: 'insensitive' };
    if (description?.trim())
      where.description = { contains: description.trim(), mode: 'insensitive' };
    if (inn?.trim()) where.inn = { contains: inn.trim(), mode: 'insensitive' };
    if (phone?.trim())
      where.phone = { contains: phone.trim(), mode: 'insensitive' };
    if (isPositiveBalance !== undefined) {
      where.balance = isPositiveBalance ? { gte: 0 } : { lt: 0 };
    }

    const totalSubPrice = await this.prisma.subscribe.aggregate({
      where: {
        paying_date: { lte: toDate, gte: fromDate },
        client: where,
      },
      _sum: { price: true },
    });

    const totalDevicePrice = await this.prisma.saleProduct.aggregate({
      where: {
        isDeleted: false,
        sale: {
          date: { lte: toDate, gte: fromDate },
          isDeleted: false,
          client: where,
        },
        product: { type: 'DEVICE' },
      },
      _sum: { priceCount: true },
    });

    const totalServicePrice = await this.prisma.saleProduct.aggregate({
      where: {
        isDeleted: false,
        sale: {
          date: { lte: toDate, gte: fromDate },
          isDeleted: false,
          client: where,
        },
        product: { type: 'SERVICE' },
      },
      _sum: { priceCount: true },
    });

    const totalClientPaid = await this.prisma.paidClient.aggregate({
      where: {
        isDeleted: false,
        Client: where,
      },
      _sum: { price: true },
    });

    const totals = {
      subscribe: totalSubPrice._sum.price,
      device: totalDevicePrice._sum.priceCount,
      service: totalServicePrice._sum.priceCount,
      price: totalClientPaid._sum.price,
    };

    return {
      total,
      totals,
      page,
      limit,
      data,
    };
  }

  async findOne(id: number) {
    const client = await this.prisma.client.findFirst({
      where: { id, isDeleted: false },
      include: { ClientType: true, District: true, Region: true },
    });
    if (!client) {
      throw HttpError({ code: 'Client not found' });
    }
    return client;
  }

  async update(id: number, dto: UpdateClientDto, creatorId: number) {
    const client = await this.prisma.client.findFirst({
      where: { id, isDeleted: false },
    });
    if (!client) throw HttpError({ code: 'Client not found' });

    const updateData: Partial<Client> = {
      name: dto.name ?? client.name,
      address: dto.address ?? client.address,
      balance: dto.balance ?? client.balance,
      description: dto.description ?? client.description,
      districtId: dto.districtId ?? client.districtId,
      inn: dto.inn ?? client.inn,
      phone: dto.phone ?? client.phone,
      regionId: dto.regionId ?? client.regionId,
      typeId: dto.typeId ?? client.typeId,
      modifyId: creatorId,
    };

    let type: ClientType;
    if (updateData.typeId) {
      type = await this.prisma.clientType.findFirst({
        where: { id: updateData.typeId, isDeleted: false },
      });
      if (!type) {
        throw HttpError({ code: 'type Not Found' });
      }
      updateData.typeId = type.id;
    }

    const updatedClient = await this.prisma.client.update({
      where: { id },
      data: updateData,
    });

    return updatedClient;
  }

  async remove(id: number) {
    const client = await this.prisma.client.findFirst({
      where: { id: id, isDeleted: false },
    });
    if (!client) {
      throw HttpError({ code: 'Client not found' });
    }
    return await this.prisma.client.update({
      where: { id: id },
      data: { isDeleted: true },
    });
  }
}
