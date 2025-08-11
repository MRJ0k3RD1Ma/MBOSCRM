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
exports.PaidServerService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const http_error_1 = require("../../common/exception/http.error");
const client_1 = require("@prisma/client");
let PaidServerService = class PaidServerService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createPaidServerDto) {
        const { description, price, paymentTypeId, serverId, endDate } = createPaidServerDto;
        if (serverId) {
            const server = await this.prisma.server.findFirst({
                where: { id: serverId, isDeleted: false },
            });
            if (!server) {
                throw new http_error_1.HttpError({
                    message: `Server with ID ${serverId} not found or deleted`,
                });
            }
            await this.prisma.server.update({
                data: { state: client_1.ServerState.RUNNING, endDate },
                where: { id: serverId },
            });
        }
        await this.prisma.setting.update({
            where: { id: 1 },
            data: { balance: { decrement: price } },
        });
        const paidServer = await this.prisma.paidServer.create({
            data: {
                description,
                price,
                endDate,
                serverId,
                paymentTypeId,
            },
        });
        return paidServer;
    }
    async findAll(dto) {
        const { minPrice, maxPrice, fromDate, toDate, description, serverId } = dto;
        const where = {
            isDeleted: false,
        };
        if (minPrice || maxPrice) {
            where.price = {
                ...(minPrice !== undefined && { gte: minPrice }),
                ...(maxPrice !== undefined && { lte: maxPrice }),
            };
        }
        if (fromDate || toDate) {
            where.endDate = {
                ...(fromDate && { gte: fromDate }),
                ...(toDate && { lte: toDate }),
            };
        }
        if (serverId) {
            where.serverId = serverId;
        }
        if (description) {
            where.description = { contains: description };
        }
        return this.prisma.paidServer.findMany({
            where,
            include: {
                paymentType: true,
                server: { select: { id: true, name: true } },
            },
        });
    }
    async findOne(id) {
        const paidServer = await this.prisma.paidServer.findFirst({
            where: { id, isDeleted: false },
            include: {
                paymentType: true,
                server: { select: { id: true, name: true } },
            },
        });
        if (!paidServer) {
            throw new http_error_1.HttpError({ message: `PaidServer with ID ${id} not found` });
        }
        return paidServer;
    }
    async update(id, updatePaidServerDto) {
        const paidServer = await this.prisma.paidServer.findFirst({
            where: {
                id,
                isDeleted: false,
            },
        });
        if (!paidServer) {
            throw new http_error_1.HttpError({ message: `PaidServer with ID ${id} not found` });
        }
        const { serverId } = updatePaidServerDto;
        if (serverId) {
            const server = await this.prisma.server.findFirst({
                where: { id: serverId, isDeleted: false },
            });
            if (!server) {
                throw new http_error_1.HttpError({
                    message: `Server with ID ${serverId} not found`,
                });
            }
        }
        return this.prisma.paidServer.update({
            where: { id },
            data: {
                description: updatePaidServerDto.description ?? paidServer.description,
                serverId: updatePaidServerDto.serverId ?? paidServer.serverId,
                endDate: updatePaidServerDto.endDate ?? paidServer.endDate,
                price: updatePaidServerDto.price ?? paidServer.price,
                paymentTypeId: updatePaidServerDto.paymentTypeId ?? paidServer.paymentTypeId,
            },
        });
    }
    async remove(id) {
        const paidServer = await this.prisma.paidServer.findFirst({
            where: { id, isDeleted: false },
        });
        if (!paidServer) {
            throw new http_error_1.HttpError({ message: `PaidServer with ID ${id} not found` });
        }
        const result = await this.prisma.paidServer.update({
            where: { id },
            data: { isDeleted: true },
        });
        return result;
    }
};
exports.PaidServerService = PaidServerService;
exports.PaidServerService = PaidServerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaidServerService);
//# sourceMappingURL=paid-server.service.js.map