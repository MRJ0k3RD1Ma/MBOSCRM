"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const common_1 = require("@nestjs/common");
const http_error_1 = require("../../common/exception/http.error");
const prisma_service_1 = require("../prisma/prisma.service");
const config_1 = require("../../common/config");
const faker_1 = require("@faker-js/faker");
const event_emitter_1 = require("@nestjs/event-emitter");
let ClientService = class ClientService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async recalculate(clientId) {
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
        const clientBalance = paidClient - salePrice - subscriptionPaid - subscriptionCredit;
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
        if (config_1.env.ENV != 'prod') {
            const clientCount = await this.prisma.client.count();
            const requiredCount = 3;
            if (clientCount < requiredCount) {
                for (let i = clientCount; i < requiredCount; i++) {
                    await this.create({
                        balance: 0,
                        address: faker_1.faker.location.streetAddress(),
                        description: faker_1.faker.person.jobTitle(),
                        districtId: 1733223,
                        regionId: 1733,
                        inn: faker_1.faker.commerce.isbn(),
                        name: faker_1.faker.person.fullName(),
                        phone: faker_1.faker.phone.number(),
                        typeId: 1,
                    }, 1);
                }
            }
        }
    }
    async create(createClientDto, creatorId) {
        const creator = await this.prisma.user.findFirst({
            where: { id: creatorId, isDeleted: false },
        });
        if (!creator) {
            throw (0, http_error_1.HttpError)({ message: 'Creator not found' });
        }
        if (createClientDto.districtId) {
            const district = await this.prisma.district.findUnique({
                where: { id: createClientDto.districtId },
            });
            if (!district) {
                throw (0, http_error_1.HttpError)({ code: 'District not found' });
            }
        }
        if (createClientDto.regionId) {
            const region = await this.prisma.region.findUnique({
                where: { id: createClientDto.regionId },
            });
            if (!region) {
                throw (0, http_error_1.HttpError)({ code: 'Region not found' });
            }
        }
        let type;
        if (createClientDto.typeId) {
            type = await this.prisma.clientType.findFirst({
                where: { id: createClientDto.typeId, isDeleted: false },
            });
            if (!type) {
                throw (0, http_error_1.HttpError)({ code: 'type Not Found' });
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
    async findAll(dto) {
        const { limit = 10, page = 1, name, districtId, regionId, address, description, inn, phone, isPositiveBalance, fromDate, toDate, sortBy, sortOrder = 'desc', } = dto;
        const whereConditions = ['c."isDeleted" = false'];
        const params = [];
        let paramIndex = 1;
        if (name) {
            whereConditions.push(`(LOWER(c."name") LIKE LOWER($${paramIndex}) OR LOWER(c."inn") LIKE LOWER($${paramIndex}))`);
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
            }
            else {
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
            }
            else if (sortBy === 'totalSale') {
                orderByClause = `"totalSale" ${direction} NULLS LAST`;
            }
            else if (sortBy === 'totalSub') {
                orderByClause = `"totalSubscription" ${direction} NULLS LAST`;
            }
            else if (sortBy === 'totalBalance') {
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
            this.prisma.$queryRawUnsafe(query, ...params),
            this.prisma.$queryRawUnsafe(countQuery, ...countParams),
        ]);
        const data = rawData.map((row) => ({
            ...row,
            totalPaid: Number(row.totalPaid),
            totalSale: Number(row.totalSale),
            totalSubscription: Number(row.totalSubscription),
        }));
        const total = Number(countResult[0]?.total || 0);
        const where = { isDeleted: false };
        if (name) {
            where.OR = [
                { name: { contains: name.trim(), mode: 'insensitive' } },
                { inn: { contains: name.trim(), mode: 'insensitive' } },
            ];
        }
        if (districtId !== undefined)
            where.districtId = districtId;
        if (regionId !== undefined)
            where.regionId = regionId;
        if (address?.trim())
            where.address = { contains: address.trim(), mode: 'insensitive' };
        if (description?.trim())
            where.description = { contains: description.trim(), mode: 'insensitive' };
        if (inn?.trim())
            where.inn = { contains: inn.trim(), mode: 'insensitive' };
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
                paidDate: { lte: toDate, gte: fromDate },
                isDeleted: false,
                Client: where,
            },
            _sum: { price: true },
        });
        const totalSaleDept = await this.prisma.sale.aggregate({
            _sum: { credit: true },
            where: {
                date: { gte: fromDate, lte: toDate },
                isDeleted: false,
                client: { isDeleted: false },
            },
        });
        const totalSubDept = await this.prisma.subscribe.aggregate({
            _sum: { price: true, paid: true },
            where: {
                createdAt: { gte: fromDate, lte: toDate },
                isDeleted: false,
                client: where,
                sale: { isDeleted: false },
            },
        });
        const sumOrZero = (agg, field) => (agg && agg._sum && (agg._sum[field] ?? 0)) || 0;
        const subPrice = sumOrZero(totalSubDept, 'price');
        const subPaid = sumOrZero(totalSubDept, 'paid');
        const expectedSubscription = Math.max(0, subPrice - subPaid);
        const saleCredit = sumOrZero(totalSaleDept, 'credit');
        const totalDebts = saleCredit + expectedSubscription;
        const totals = {
            subscribe: totalSubPrice._sum.price,
            device: totalDevicePrice._sum.priceCount,
            service: totalServicePrice._sum.priceCount,
            price: totalClientPaid._sum.price,
            credit: totalDebts,
        };
        return {
            total,
            totals,
            page,
            limit,
            data,
        };
    }
    async findOne(id) {
        const client = await this.prisma.client.findFirst({
            where: { id, isDeleted: false },
            include: { ClientType: true, District: true, Region: true },
        });
        if (!client) {
            throw (0, http_error_1.HttpError)({ code: 'Client not found' });
        }
        return client;
    }
    async update(id, dto, creatorId) {
        const client = await this.prisma.client.findFirst({
            where: { id, isDeleted: false },
        });
        if (!client)
            throw (0, http_error_1.HttpError)({ code: 'Client not found' });
        const updateData = {
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
        let type;
        if (updateData.typeId) {
            type = await this.prisma.clientType.findFirst({
                where: { id: updateData.typeId, isDeleted: false },
            });
            if (!type) {
                throw (0, http_error_1.HttpError)({ code: 'type Not Found' });
            }
            updateData.typeId = type.id;
        }
        const updatedClient = await this.prisma.client.update({
            where: { id },
            data: updateData,
        });
        return updatedClient;
    }
    async remove(id) {
        const client = await this.prisma.client.findFirst({
            where: { id: id, isDeleted: false },
        });
        if (!client) {
            throw (0, http_error_1.HttpError)({ code: 'Client not found' });
        }
        return await this.prisma.client.update({
            where: { id: id },
            data: { isDeleted: true },
        });
    }
};
exports.ClientService = ClientService;
__decorate([
    (0, event_emitter_1.OnEvent)('recalculate.client'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ClientService.prototype, "recalculate", null);
exports.ClientService = ClientService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClientService);
//# sourceMappingURL=client.service.js.map