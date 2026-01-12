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
exports.PaidSupplierService = void 0;
const common_1 = require("@nestjs/common");
const http_error_1 = require("../../common/exception/http.error");
const prisma_service_1 = require("../prisma/prisma.service");
const config_1 = require("../../common/config");
const event_emitter_1 = require("@nestjs/event-emitter");
let PaidSupplierService = class PaidSupplierService {
    constructor(prisma, eventEmitter) {
        this.prisma = prisma;
        this.eventEmitter = eventEmitter;
    }
    async onModuleInit() {
        if (config_1.env.ENV != "prod") {
            const count = await this.prisma.paidSupplier.count();
            const requiredCount = 5;
            if (count < requiredCount) {
                const supplier = await this.prisma.supplier.findFirst({
                    where: { isDeleted: false },
                });
                if (!supplier)
                    return;
                for (let i = count; i < requiredCount; i++) {
                    await this.create({
                        paymentId: 1,
                        price: 100,
                        supplierId: supplier.id,
                        paidDate: new Date(),
                    }, 1);
                }
            }
        }
    }
    async create(createPaidSupplierDto, creatorId) {
        const { paymentId, price, supplierId, paidDate } = createPaidSupplierDto;
        const payment = await this.prisma.payment.findFirst({
            where: { id: paymentId, isDeleted: false },
        });
        if (!payment) {
            throw new http_error_1.HttpError({ message: "Payment Not Found" });
        }
        const supplier = await this.prisma.supplier.findFirst({
            where: { id: supplierId, isDeleted: false },
        });
        if (!supplier) {
            throw new http_error_1.HttpError({ message: "Supplier Not Found", code: 404 });
        }
        await this.prisma.setting.update({
            where: { id: 1 },
            data: { balance: { decrement: price } },
        });
        await this.prisma.supplier.update({
            where: { id: supplierId },
            data: { balance: { increment: price } },
        });
        const paidsupplier = await this.prisma.paidSupplier.create({
            data: {
                supplierId,
                paidDate,
                price,
                paymentId,
                modifyId: creatorId,
                registerId: creatorId,
            },
        });
        this.eventEmitter.emit("recalculate.supplier", supplierId);
        return paidsupplier;
    }
    async findAll(dto) {
        const { limit = 10, page = 1, maxPaidDate, minPaidDate, supplierId, paymentId, } = dto;
        const where = {
            isDeleted: false,
        };
        if (supplierId !== undefined) {
            where.supplierId = supplierId;
        }
        if (paymentId !== undefined) {
            where.paymentId = paymentId;
        }
        if (minPaidDate || maxPaidDate) {
            where.paidDate = {
                ...(minPaidDate && { gte: minPaidDate }),
                ...(maxPaidDate && { lte: maxPaidDate }),
            };
        }
        const [data, agg] = await this.prisma.$transaction([
            this.prisma.paidSupplier.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { id: "desc" },
                include: { Payment: true, register: true, modify: true },
            }),
            this.prisma.paidSupplier.aggregate({
                where,
                _sum: { price: true },
                _count: { _all: true },
            }),
        ]);
        return {
            total: agg._count._all,
            price: agg._sum.price,
            page,
            limit,
            data,
        };
    }
    async findOne(id) {
        const paidSupplier = await this.prisma.paidSupplier.findFirst({
            where: {
                id,
                isDeleted: false,
            },
            include: {
                register: true,
                Payment: true,
                modify: true,
            },
        });
        if (!paidSupplier) {
            throw (0, http_error_1.HttpError)({ code: "PaidSupplier not found" });
        }
        return paidSupplier;
    }
    async update(id, dto) {
        const paidsupplier = await this.prisma.paidSupplier.findFirst({
            where: { id, isDeleted: false },
        });
        if (!paidsupplier)
            throw (0, http_error_1.HttpError)({ code: "PaidSupplier not found" });
        const updateData = {
            price: dto.price ?? paidsupplier.price,
            paidDate: dto.paidDate ?? paidsupplier.paidDate,
        };
        const updatedPaidSupplier = await this.prisma.paidSupplier.update({
            where: { id },
            data: updateData,
        });
        this.eventEmitter.emit("recalculate.supplier", paidsupplier.supplierId);
        return updatedPaidSupplier;
    }
    async remove(id, modifierId) {
        let paidsupplier = await this.prisma.paidSupplier.findFirst({
            where: { id: id, isDeleted: false },
        });
        if (!paidsupplier) {
            throw (0, http_error_1.HttpError)({ code: "PaidSupplier not found" });
        }
        this.eventEmitter.emit("recalculate.supplier", paidsupplier.supplierId);
        paidsupplier = await this.prisma.paidSupplier.update({
            where: { id: id },
            data: { isDeleted: true, modifyId: modifierId },
        });
        return paidsupplier;
    }
};
exports.PaidSupplierService = PaidSupplierService;
exports.PaidSupplierService = PaidSupplierService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        event_emitter_1.EventEmitter2])
], PaidSupplierService);
//# sourceMappingURL=paid-supplier.service.js.map