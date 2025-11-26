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
exports.ArrivedProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const http_error_1 = require("../../common/exception/http.error");
const event_emitter_1 = require("@nestjs/event-emitter");
let ArrivedProductService = class ArrivedProductService {
    constructor(prisma, eventEmitter) {
        this.prisma = prisma;
        this.eventEmitter = eventEmitter;
    }
    async create(createArrivedProductDto, registerId) {
        let { arrivedId, count, productId, price } = createArrivedProductDto;
        if (!arrivedId) {
            throw new http_error_1.HttpError({
                message: `arrived Id it not defined`,
            });
        }
        const arrived = await this.prisma.arrived.findFirst({
            where: { id: arrivedId, isDeleted: false },
        });
        if (!arrived) {
            throw new http_error_1.HttpError({
                message: `Arrived with ID ${arrivedId} not found`,
            });
        }
        const product = await this.prisma.product.findFirst({
            where: { id: productId, isDeleted: false },
        });
        if (!product) {
            throw new http_error_1.HttpError({
                message: `Product with ID ${productId} not found`,
            });
        }
        price = price || product.priceIncome;
        const arrivedproduct = await this.prisma.arrivedProduct.create({
            data: {
                count,
                price,
                priceCount: price * count,
                arrivedId,
                productId,
                registerId,
            },
        });
        await this.prisma.product.update({
            where: { id: productId },
            data: {
                countArrived: {
                    increment: count,
                },
                countReminder: {
                    increment: count,
                },
            },
        });
        this.eventEmitter.emit("recalculate.arrived", arrived.id);
        this.eventEmitter.emit("recalculate.product", productId);
        return arrivedproduct;
    }
    async findAll(dto) {
        const { limit = 10, page = 1, minPrice, maxPrice, productId, supplierId, arrivedId, } = dto;
        const where = {
            isDeleted: false,
        };
        if (supplierId) {
            where.Arrived = { supplierId };
        }
        if (arrivedId) {
            where.arrivedId = arrivedId;
        }
        if (productId) {
            where.productId = productId;
        }
        if (minPrice || maxPrice) {
            where.price = {
                ...(minPrice && { gte: minPrice }),
                ...(maxPrice && { lte: maxPrice }),
            };
        }
        const [data, total] = await this.prisma.$transaction([
            this.prisma.arrivedProduct.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                include: {
                    Arrived: { include: { supplier: true } },
                    Product: { include: { ProductUnit: true } },
                    register: true,
                },
                orderBy: {
                    id: "desc",
                },
            }),
            this.prisma.arrivedProduct.count({ where }),
        ]);
        return {
            total,
            page,
            limit,
            data,
        };
    }
    async findOne(id) {
        const arrivedproduct = await this.prisma.arrivedProduct.findFirst({
            where: {
                id,
                isDeleted: false,
            },
        });
        if (!arrivedproduct) {
            throw new http_error_1.HttpError({
                message: `ArrivedProduct with ID ${id} not found`,
            });
        }
        return arrivedproduct;
    }
    async update(id, updateArrivedProductDto) {
        let arrivedproduct = await this.prisma.arrivedProduct.findFirst({
            where: {
                id,
                isDeleted: false,
            },
        });
        if (!arrivedproduct) {
            throw new http_error_1.HttpError({
                message: `ArrivedProduct with ID ${id} not found`,
            });
        }
        arrivedproduct = await this.prisma.arrivedProduct.update({
            where: { id },
            data: {
                price: updateArrivedProductDto.price || arrivedproduct.price,
                count: updateArrivedProductDto.count || arrivedproduct.count,
                priceCount: (updateArrivedProductDto.price || arrivedproduct.price) *
                    (updateArrivedProductDto.count || arrivedproduct.count) ||
                    arrivedproduct.priceCount,
            },
        });
        this.eventEmitter.emit("recalculate.arrived", arrivedproduct.arrivedId);
        this.eventEmitter.emit("recalculate.product", arrivedproduct.productId);
        return arrivedproduct;
    }
    async remove(id) {
        let arrivedproduct = await this.prisma.arrivedProduct.findFirst({
            where: {
                id,
                isDeleted: false,
            },
        });
        if (!arrivedproduct) {
            throw new http_error_1.HttpError({
                message: `ArrivedProduct with ID ${id} not found`,
            });
        }
        arrivedproduct = this.prisma.arrivedProduct.update({
            where: { id },
            data: { isDeleted: true },
        });
        this.eventEmitter.emit("recalculate.arrived", arrivedproduct.arrivedId);
        this.eventEmitter.emit("recalculate.product", arrivedproduct.productId);
        return arrivedproduct;
    }
};
exports.ArrivedProductService = ArrivedProductService;
exports.ArrivedProductService = ArrivedProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        event_emitter_1.EventEmitter2])
], ArrivedProductService);
//# sourceMappingURL=arrived-product.service.js.map