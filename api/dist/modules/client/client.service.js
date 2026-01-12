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
        if (config_1.env.ENV != "prod") {
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
            throw (0, http_error_1.HttpError)({ message: "Creator not found" });
        }
        if (createClientDto.districtId) {
            const district = await this.prisma.district.findUnique({
                where: { id: createClientDto.districtId },
            });
            if (!district) {
                throw (0, http_error_1.HttpError)({ code: "District not found" });
            }
        }
        if (createClientDto.regionId) {
            const region = await this.prisma.region.findUnique({
                where: { id: createClientDto.regionId },
            });
            if (!region) {
                throw (0, http_error_1.HttpError)({ code: "Region not found" });
            }
        }
        let type;
        if (createClientDto.typeId) {
            type = await this.prisma.clientType.findFirst({
                where: { id: createClientDto.typeId, isDeleted: false },
            });
            if (!type) {
                throw (0, http_error_1.HttpError)({ code: "type Not Found" });
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
        const { limit = 10, page = 1, name, districtId, regionId, address, description, inn, phone, isPositiveBalance, } = dto;
        const where = {
            isDeleted: false,
        };
        if (name) {
            where.OR = [
                { name: { contains: name.trim(), mode: "insensitive" } },
                { inn: { contains: name.trim(), mode: "insensitive" } },
            ];
        }
        if (districtId !== undefined)
            where.districtId = districtId;
        if (regionId !== undefined)
            where.regionId = regionId;
        if (address?.trim())
            where.address = { contains: address.trim(), mode: "insensitive" };
        if (description?.trim())
            where.description = { contains: description.trim(), mode: "insensitive" };
        if (inn?.trim())
            where.inn = { contains: inn.trim(), mode: "insensitive" };
        if (phone?.trim())
            where.phone = { contains: phone.trim(), mode: "insensitive" };
        if (isPositiveBalance !== undefined) {
            where.balance = isPositiveBalance ? { gte: 0 } : { lt: 0 };
        }
        const [data, total] = await this.prisma.$transaction([
            this.prisma.client.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { id: "desc" },
                include: {
                    ClientType: { select: { id: true, name: true } },
                },
            }),
            this.prisma.client.count({ where }),
        ]);
        return {
            total,
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
            throw (0, http_error_1.HttpError)({ code: "Client not found" });
        }
        return client;
    }
    async update(id, dto, creatorId) {
        const client = await this.prisma.client.findFirst({
            where: { id, isDeleted: false },
        });
        if (!client)
            throw (0, http_error_1.HttpError)({ code: "Client not found" });
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
                throw (0, http_error_1.HttpError)({ code: "type Not Found" });
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
            throw (0, http_error_1.HttpError)({ code: "Client not found" });
        }
        return await this.prisma.client.update({
            where: { id: id },
            data: { isDeleted: true },
        });
    }
};
exports.ClientService = ClientService;
__decorate([
    (0, event_emitter_1.OnEvent)("recalculate.client"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ClientService.prototype, "recalculate", null);
exports.ClientService = ClientService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClientService);
//# sourceMappingURL=client.service.js.map