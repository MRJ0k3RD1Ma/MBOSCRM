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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const http_error_1 = require("../../common/exception/http.error");
const client_1 = require("@prisma/client");
const subscribe_service_1 = require("../subscribe/subscribe.service");
const dayjs_1 = __importDefault(require("dayjs"));
let SaleProductService = class SaleProductService {
    constructor(prisma, subscribeService) {
        this.prisma = prisma;
        this.subscribeService = subscribeService;
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
            product.type === 'DEVICE') {
            throw new http_error_1.HttpError({
                message: `Maxsulot soni yetarli emas`,
            });
        }
        const isSubscription = product.type == client_1.ProductType.SUBSCRIPTION;
        let priceCount = product.price * createSaleProductDto.count;
        if (isSubscription) {
            priceCount = 0;
        }
        const saleProduct = await this.prisma.saleProduct.create({
            data: {
                saleId: createSaleProductDto.saleId,
                productId: createSaleProductDto.productId,
                count: createSaleProductDto.count,
                price: product.price,
                priceCount,
                is_subscribe: isSubscription,
                registerId: creatorId,
                modifyId: creatorId,
            },
            include: { product: true },
        });
        if (saleProduct.is_subscribe) {
            await this.subscribeService.create({
                clientId: sale.clientId,
                paid: 0,
                price: saleProduct.product.price,
                saleId: sale.id,
                state: client_1.SubscribeState.NOTPAYING,
                payingDate: (0, dayjs_1.default)(new Date()).add(1, 'month').toDate(),
            });
        }
        if (product.type == 'DEVICE') {
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
        return saleProduct;
    }
    async findAll(dto) {
        const { limit = 10, page = 1, saleId, clientId, productId, isSubscribe, } = dto;
        const where = {
            isDeleted: false,
        };
        if (saleId) {
            where.saleId = saleId;
        }
        if (clientId) {
            where.sale = { clientId };
        }
        if (productId) {
            where.productId = productId;
        }
        if (isSubscribe !== undefined) {
            where.is_subscribe = { equals: isSubscribe };
        }
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
                orderBy: {
                    createdAt: 'desc',
                },
            }),
            this.prisma.saleProduct.count({ where }),
        ]);
        return {
            total,
            page,
            limit,
            data,
        };
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
        const finalPrice = product.price ?? saleProduct.price;
        const finalCount = updateSaleProductDto.count ?? saleProduct.count;
        const totalPriceCount = finalPrice * finalCount;
        const isSubscribe = product
            ? product.type === 'SUBSCRIPTION' || product.type === 'SERVICE'
            : saleProduct.is_subscribe;
        return this.prisma.saleProduct.update({
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
    }
    async remove(id, modifyId) {
        const saleProduct = await this.prisma.saleProduct.findFirst({
            where: { id, isDeleted: false },
        });
        if (!saleProduct) {
            throw new http_error_1.HttpError({ message: `SaleProduct with ID ${id} not found` });
        }
        return this.prisma.saleProduct.update({
            where: { id },
            data: { isDeleted: true, modifyId: modifyId },
        });
    }
};
exports.SaleProductService = SaleProductService;
exports.SaleProductService = SaleProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        subscribe_service_1.SubscribeService])
], SaleProductService);
//# sourceMappingURL=sale-product.service.js.map