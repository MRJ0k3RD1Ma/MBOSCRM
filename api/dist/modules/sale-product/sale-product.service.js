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
exports.SaleProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const http_error_1 = require("../../common/exception/http.error");
const client_1 = require("@prisma/client");
const event_emitter_1 = require("@nestjs/event-emitter");
let SaleProductService = class SaleProductService {
    constructor(prisma, eventEmitter) {
        this.prisma = prisma;
        this.eventEmitter = eventEmitter;
    }
    async create(createSaleProductDto, creatorId) {
        const sale = await this.prisma.sale.findFirst({
            where: { id: createSaleProductDto.saleId },
        });
        if (!sale) {
            throw new http_error_1.HttpError({
                message: `Sale with ID ${createSaleProductDto.saleId} not found`,
            });
        }
        const product = await this.prisma.product.findFirst({
            where: { id: createSaleProductDto.productId },
        });
        if (!product) {
            throw new http_error_1.HttpError({
                message: `Product with ID ${createSaleProductDto.productId} not found`,
            });
        }
        if (product.countReminder < createSaleProductDto.count &&
            product.type === "DEVICE") {
            throw new http_error_1.HttpError({
                message: `Maxsulot soni yetarli emas`,
            });
        }
        const isSubscription = product.type == client_1.ProductType.SUBSCRIPTION;
        let priceCount = (createSaleProductDto.price || product.price) *
            createSaleProductDto.count;
        if (isSubscription) {
            priceCount = 0;
        }
        const saleProduct = await this.prisma.saleProduct.create({
            data: {
                saleId: createSaleProductDto.saleId,
                productId: createSaleProductDto.productId,
                count: createSaleProductDto.count,
                price: createSaleProductDto.price || product.price,
                priceCount,
                is_subscribe: isSubscription,
                registerId: creatorId,
                modifyId: creatorId,
            },
            include: { product: true },
        });
        await this.prisma.sale.update({
            where: { id: sale.id },
            data: {
                price: { increment: priceCount },
                credit: { increment: priceCount },
                state: client_1.SaleState.RUNNING,
            },
        });
        if (product.type == "DEVICE") {
            await this.prisma.product.update({
                where: { id: product.id },
                data: {
                    countReminder: {
                        decrement: createSaleProductDto.count,
                    },
                    countSale: {
                        increment: createSaleProductDto.count,
                    },
                    modifyId: creatorId,
                },
            });
        }
        this.eventEmitter.emit("recalculate.product", product.id);
        return saleProduct;
    }
    async findAll(dto) {
        const { limit = 10, page = 1, saleId, clientId, productId, isSubscribe } = dto;
        const where = { isDeleted: false };
        if (saleId !== undefined)
            where.saleId = saleId;
        if (clientId !== undefined)
            where.sale = { clientId };
        if (productId !== undefined)
            where.productId = productId;
        if (isSubscribe !== undefined)
            where.is_subscribe = { equals: isSubscribe };
        const [data, total] = await this.prisma.$transaction([
            this.prisma.saleProduct.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                include: {
                    product: { include: { ProductUnit: true } },
                    sale: true,
                    modify: true,
                    register: true,
                },
                orderBy: { id: "desc" },
            }),
            this.prisma.saleProduct.count({ where }),
        ]);
        return { total, page, limit, data };
    }
    async findOne(id) {
        const saleProduct = await this.prisma.saleProduct.findFirst({
            where: { id, isDeleted: false },
            include: { product: true },
        });
        if (!saleProduct) {
            throw new http_error_1.HttpError({
                message: `SaleProduct with ID ${id} not found`,
            });
        }
        return saleProduct;
    }
    async update(id, updateSaleProductDto, modifyId) {
        const saleProduct = await this.prisma.saleProduct.findFirst({
            where: { id, isDeleted: false },
        });
        if (!saleProduct) {
            throw new http_error_1.HttpError({ message: `SaleProduct with ID ${id} not found` });
        }
        if (updateSaleProductDto.saleId) {
            const sale = await this.prisma.sale.findFirst({
                where: { id: updateSaleProductDto.saleId },
            });
            if (!sale) {
                throw new http_error_1.HttpError({
                    message: `Sale with ID ${updateSaleProductDto.saleId} not found`,
                });
            }
        }
        let product = null;
        if (updateSaleProductDto.productId) {
            product = await this.prisma.product.findFirst({
                where: { id: updateSaleProductDto.productId },
            });
            if (!product) {
                throw new http_error_1.HttpError({
                    message: `Product with ID ${updateSaleProductDto.productId} not found`,
                });
            }
        }
        const finalPrice = product?.price ?? updateSaleProductDto.price ?? saleProduct.price;
        const finalCount = updateSaleProductDto.count ?? saleProduct.count;
        const totalPriceCount = finalPrice * finalCount;
        const isSubscribe = product
            ? product.type === "SUBSCRIPTION" || product.type === "SERVICE"
            : saleProduct.is_subscribe;
        const updatedProduct = await this.prisma.saleProduct.update({
            where: { id },
            data: {
                saleId: updateSaleProductDto.saleId ?? saleProduct.saleId,
                productId: updateSaleProductDto.productId ?? saleProduct.productId,
                count: finalCount,
                price: finalPrice,
                priceCount: totalPriceCount,
                is_subscribe: isSubscribe,
                modifyId: modifyId,
            },
        });
        this.eventEmitter.emit("recalculate.product", updateSaleProductDto.productId ?? saleProduct.productId);
        return updatedProduct;
    }
    async remove(id) {
        const saleProduct = await this.prisma.saleProduct.findFirst({
            where: { id, isDeleted: false },
        });
        if (!saleProduct) {
            throw new http_error_1.HttpError({ message: `SaleProduct with ID ${id} not found` });
        }
        if (saleProduct.is_subscribe) {
            await this.prisma.subscribe.updateMany({
                where: { saleId: saleProduct.saleId },
                data: { isDeleted: true },
            });
        }
        const sale = await this.prisma.sale.findFirst({
            where: { id: saleProduct.saleId },
        });
        const productPrice = saleProduct.priceCount;
        const totalSalePrice = sale.price;
        const paidAmount = sale.dept;
        const unpaidAmount = sale.credit;
        const paidRatio = totalSalePrice > 0 ? paidAmount / totalSalePrice : 0;
        const productPaidPortion = Math.round(productPrice * paidRatio);
        const productUnpaidPortion = productPrice - productPaidPortion;
        await this.prisma.sale.update({
            where: { id: saleProduct.saleId },
            data: {
                price: { decrement: productPrice },
                dept: { decrement: productPaidPortion },
                credit: { decrement: productUnpaidPortion },
            },
        });
        if (productPaidPortion > 0) {
            await this.prisma.client.update({
                where: { id: sale.clientId },
                data: { balance: { increment: productPaidPortion } },
            });
        }
        this.eventEmitter.emit("recalculate.client", sale.clientId);
        this.eventEmitter.emit("recalculate.product", saleProduct.productId);
        return await this.prisma.saleProduct.update({
            where: { id },
            data: { isDeleted: true },
        });
    }
};
exports.SaleProductService = SaleProductService;
exports.SaleProductService = SaleProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        event_emitter_1.EventEmitter2])
], SaleProductService);
//# sourceMappingURL=sale-product.service.js.map