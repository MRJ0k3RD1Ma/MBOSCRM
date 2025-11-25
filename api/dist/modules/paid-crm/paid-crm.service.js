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
exports.PaidCrmService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const http_error_1 = require("src/common/exception/http.error");
let PaidCrmService = class PaidCrmService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createPaidCrmDto) {
        const { crmId, paymentId, paidDate, price, expiredFullAccess } = createPaidCrmDto;
        const crm = await this.prisma.clientCrm.findFirst({
            where: { id: crmId, isDeleted: false },
            include: { product: true, client: true },
        });
        if (!crm) {
            throw new http_error_1.HttpError({
                message: `Crm with ID ${crmId} not found or deleted`,
            });
        }
        const payment = await this.prisma.payment.findFirst({
            where: { id: paymentId, isDeleted: false },
        });
        if (!payment) {
            throw new http_error_1.HttpError({
                message: `Payment with ID ${paymentId} not found or deleted`,
            });
        }
        const paidCrm = await this.prisma.paidCrm.create({
            data: {
                paidDate,
                price,
                crmId,
                paymentId,
                clientId: crm.clientId,
            },
        });
        await this.prisma.setting.update({
            where: { id: 1 },
            data: {
                balance: {
                    increment: price,
                },
            },
        });
        await this.prisma.clientCrm.update({
            where: { id: crmId },
            data: { expiredFullAccess, isFullAccess: true },
        });
        return paidCrm;
    }
    async findAll(dto) {
        const { minPrice, maxPrice, fromDate, toDate, crmId, paymentId, limit = 10, page = 1, } = dto;
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
            where.paidDate = {
                ...(fromDate && { gte: fromDate }),
                ...(toDate && { lte: toDate }),
            };
        }
        if (crmId) {
            where.crmId = crmId;
        }
        if (paymentId) {
            where.paymentId = paymentId;
        }
        const paidCrms = await this.prisma.paidCrm.findMany({
            where,
            include: {},
            skip: (page - 1) * limit,
            take: limit,
            orderBy: {
                id: 'desc',
            },
        });
        const agg = await this.prisma.paidCrm.aggregate({
            _sum: { price: true },
            _count: { _all: true },
        });
        return {
            data: paidCrms,
            page,
            limit,
            total: agg._count._all,
            price: agg._sum.price,
        };
    }
    async findOne(id) {
        const paidCrm = await this.prisma.paidCrm.findFirst({
            where: { id, isDeleted: false },
            include: {},
        });
        if (!paidCrm) {
            throw new http_error_1.HttpError({ message: `PaidCrm with ID ${id} not found` });
        }
        return paidCrm;
    }
    async update(id, updatePaidCrmDto) {
        const paidCrm = await this.prisma.paidCrm.findFirst({
            where: {
                id,
                isDeleted: false,
            },
        });
        if (!paidCrm) {
            throw new http_error_1.HttpError({ message: `PaidCrm with ID ${id} not found` });
        }
        const { crmId, paymentId } = updatePaidCrmDto;
        if (crmId) {
            const crm = await this.prisma.clientCrm.findFirst({
                where: { id: crmId, isDeleted: false },
            });
            if (!crm) {
                throw new http_error_1.HttpError({
                    message: `Crm with ID ${crmId} not found`,
                });
            }
        }
        if (paymentId) {
            const payment = await this.prisma.payment.findFirst({
                where: { id: paymentId, isDeleted: false },
            });
            if (!payment) {
                throw new http_error_1.HttpError({
                    message: `Payment with ID ${paymentId} not found`,
                });
            }
        }
        return this.prisma.paidCrm.update({
            where: { id },
            data: {
                crmId: updatePaidCrmDto.crmId ?? paidCrm.crmId,
                paymentId: updatePaidCrmDto.paymentId ?? paidCrm.paymentId,
                paidDate: updatePaidCrmDto.paidDate ?? paidCrm.paidDate,
                price: updatePaidCrmDto.price ?? paidCrm.price,
            },
        });
    }
    async remove(id) {
        const paidCrm = await this.prisma.paidCrm.findFirst({
            where: { id, isDeleted: false },
        });
        if (!paidCrm) {
            throw new http_error_1.HttpError({ message: `PaidCrm with ID ${id} not found` });
        }
        const result = await this.prisma.paidCrm.update({
            where: { id },
            data: { isDeleted: true },
        });
        return result;
    }
};
exports.PaidCrmService = PaidCrmService;
exports.PaidCrmService = PaidCrmService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaidCrmService);
//# sourceMappingURL=paid-crm.service.js.map