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
exports.PaidOtherService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const http_error_1 = require("../../common/exception/http.error");
let PaidOtherService = class PaidOtherService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createPaidOtherDto) {
        const { description, groupId, paidDate, price, type, paymentId } = createPaidOtherDto;
        const paymentMethod = await this.prisma.payment.findFirst({
            where: { id: paymentId, isDeleted: false },
        });
        if (!paymentMethod) {
            throw new http_error_1.HttpError({
                message: `Payment with ID ${paymentId} not found or deleted`,
            });
        }
        if (groupId) {
            const group = await this.prisma.paidOtherGroup.findFirst({
                where: { id: groupId, isDeleted: false },
            });
            if (!group) {
                throw new http_error_1.HttpError({
                    message: `group with ID ${groupId} not found or deleted`,
                });
            }
        }
        const paidOther = await this.prisma.paidOther.create({
            data: {
                description,
                groupId,
                paidDate,
                price,
                type,
                paymentId,
            },
        });
        if (type === 'OUTCOME') {
            await this.prisma.setting.update({
                where: { id: 1 },
                data: { balance: { decrement: price } },
            });
        }
        else if (type === 'INCOME') {
            await this.prisma.setting.update({
                where: { id: 1 },
                data: { balance: { increment: price } },
            });
        }
        return paidOther;
    }
    async findAll(dto) {
        const { minPrice, maxPrice, fromDate, toDate, description, groupId, type } = dto;
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
        if (groupId) {
            where.groupId = groupId;
        }
        if (description) {
            where.description = { contains: description };
        }
        if (type) {
            where.type = { equals: type };
        }
        return this.prisma.paidOther.findMany({
            where,
            include: {
                group: true,
                Payment: true,
            },
        });
    }
    async findOne(id) {
        const paidOther = await this.prisma.paidOther.findFirst({
            where: { id, isDeleted: false },
            include: {
                group: true,
                Payment: true,
            },
        });
        if (!paidOther) {
            throw new http_error_1.HttpError({ message: `PaidOther with ID ${id} not found` });
        }
        return paidOther;
    }
    async update(id, updatePaidOtherDto) {
        const paidOther = await this.prisma.paidOther.findFirst({
            where: {
                id,
                isDeleted: false,
            },
        });
        if (!paidOther) {
            throw new http_error_1.HttpError({ message: `PaidOther with ID ${id} not found` });
        }
        const { groupId } = updatePaidOtherDto;
        if (groupId) {
            const group = await this.prisma.paidOtherGroup.findFirst({
                where: { id: groupId, isDeleted: false },
            });
            if (!group) {
                throw new http_error_1.HttpError({
                    message: `Group with ID ${groupId} not found`,
                });
            }
        }
        if (updatePaidOtherDto.paymentId) {
            const paymentMethod = await this.prisma.payment.findFirst({
                where: { id: updatePaidOtherDto.paymentId, isDeleted: false },
            });
            if (!paymentMethod) {
                throw new http_error_1.HttpError({
                    message: `Payment with ID ${updatePaidOtherDto.paymentId} not found or deleted`,
                });
            }
        }
        return this.prisma.paidOther.update({
            where: { id },
            data: {
                description: updatePaidOtherDto.description ?? paidOther.description,
                groupId: updatePaidOtherDto.groupId ?? paidOther.groupId,
                paidDate: updatePaidOtherDto.paidDate ?? paidOther.paidDate,
                price: updatePaidOtherDto.price ?? paidOther.price,
                type: updatePaidOtherDto.type ?? paidOther.type,
                paymentId: updatePaidOtherDto.paymentId ?? paidOther.paymentId,
            },
        });
    }
    async remove(id) {
        const paidOther = await this.prisma.paidOther.findFirst({
            where: { id, isDeleted: false },
        });
        if (!paidOther) {
            throw new http_error_1.HttpError({ message: `PaidOther with ID ${id} not found` });
        }
        const result = await this.prisma.paidOther.update({
            where: { id },
            data: { isDeleted: true },
        });
        return result;
    }
};
exports.PaidOtherService = PaidOtherService;
exports.PaidOtherService = PaidOtherService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaidOtherService);
//# sourceMappingURL=paid-other.service.js.map