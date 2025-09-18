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
exports.ClientCrmService = void 0;
const common_1 = require("@nestjs/common");
const http_error_1 = require("../../common/exception/http.error");
const prisma_service_1 = require("../prisma/prisma.service");
const uuid_1 = require("uuid");
let ClientCrmService = class ClientCrmService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async onModuleInit() { }
    async create(createClientCrmDto) {
        const client = await this.prisma.client.findFirst({
            where: { id: createClientCrmDto.clientId, isDeleted: false },
        });
        if (!client) {
            throw (0, http_error_1.HttpError)({ code: 'Client Not Found' });
        }
        const product = createClientCrmDto.productId !== undefined
            ? await this.prisma.product.findUnique({
                where: { id: createClientCrmDto.productId },
            })
            : undefined;
        const clientCrm = await this.prisma.clientCrm.create({
            data: {
                key: (0, uuid_1.v4)(),
                clientId: client.id,
                productId: product?.id,
                domain: createClientCrmDto.domain,
                isFullAccess: createClientCrmDto.isFullAccess,
                expiredFullAccess: createClientCrmDto.expiredFullAccess,
                balance: 0,
            },
        });
        return clientCrm;
    }
    async findAll(dto) {
        const { limit = 10, page = 1, clientId, domain, key } = dto;
        const where = {
            isDeleted: false,
        };
        if (domain?.trim()) {
            where.domain = { contains: domain.trim(), mode: 'insensitive' };
        }
        if (key?.trim()) {
            where.key = { contains: key.trim() };
        }
        if (clientId) {
            where.clientId = clientId;
        }
        const [data, total] = await this.prisma.$transaction([
            this.prisma.clientCrm.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { id: 'desc' },
                include: {
                    client: true,
                },
            }),
            this.prisma.clientCrm.count({ where }),
        ]);
        return {
            total,
            page,
            limit,
            data,
        };
    }
    async findOne(id) {
        const clientCrm = await this.prisma.clientCrm.findFirst({
            where: { id, isDeleted: false },
            include: { client: true },
        });
        if (!clientCrm) {
            throw (0, http_error_1.HttpError)({ code: 'Client Crm not found' });
        }
        return clientCrm;
    }
    async update(id, dto) {
        const clientCrm = await this.prisma.clientCrm.findFirst({
            where: { id, isDeleted: false },
        });
        if (!clientCrm)
            throw (0, http_error_1.HttpError)({ code: 'Client Crm not found' });
        const product = dto.productId !== undefined
            ? await this.prisma.product.findUnique({
                where: { id: dto.productId },
            })
            : undefined;
        const updateData = {
            productId: product?.id ?? clientCrm.productId,
            domain: dto.domain ?? clientCrm.domain,
            isFullAccess: dto.isFullAccess ?? clientCrm.isFullAccess,
            expiredFullAccess: dto.expiredFullAccess ?? clientCrm.expiredFullAccess,
        };
        const updatedClientCrm = await this.prisma.clientCrm.update({
            where: { id },
            data: updateData,
        });
        return updatedClientCrm;
    }
    async remove(id) {
        const clientCrm = await this.prisma.clientCrm.findFirst({
            where: { id: id, isDeleted: false },
        });
        if (!clientCrm) {
            throw (0, http_error_1.HttpError)({ code: 'Client Crm not found' });
        }
        return await this.prisma.clientCrm.update({
            where: { id: id },
            data: { isDeleted: true },
        });
    }
};
exports.ClientCrmService = ClientCrmService;
exports.ClientCrmService = ClientCrmService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClientCrmService);
//# sourceMappingURL=client-crm.service.js.map