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
exports.SaleService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const http_error_1 = require("../../common/exception/http.error");
const client_1 = require("@prisma/client");
const sale_product_service_1 = require("../sale-product/sale-product.service");
const config_1 = require("../../common/config");
const dayjs_1 = __importDefault(require("dayjs"));
const subscribe_service_1 = require("../subscribe/subscribe.service");
let SaleService = class SaleService {
    constructor(prisma, saleProductService, subscribeService) {
        this.prisma = prisma;
        this.saleProductService = saleProductService;
        this.subscribeService = subscribeService;
    }
    async onModuleInit() {
        if (config_1.env.ENV != "prod") {
            const count = await this.prisma.sale.count();
            const requiredCount = 1;
            const client = await this.prisma.client.findFirst({
                where: { isDeleted: false },
            });
            if (count < requiredCount) {
                for (let i = count; i < requiredCount; i++) {
                    await this.create({
                        clientId: client.id,
                        products: [{ count: 1, productId: 1 }],
                        subscribe_begin_date: new Date(),
                        subscribe_generate_day: 10,
                        date: new Date(),
                    }, 1);
                }
            }
        }
    }
    async create(createSaleDto, creatorId) {
        const { date, clientId, products, subscribe_begin_date, subscribe_generate_day, } = createSaleDto;
        const client = await this.prisma.client.findFirst({
            where: { id: clientId, isDeleted: false },
        });
        if (!client) {
            throw new http_error_1.HttpError({
                message: `Client with ID ${clientId} not found`,
            });
        }
        const maxCode = await this.prisma.sale.findFirst({
            where: {
                createdAt: {
                    lt: new Date(new Date().getFullYear(), 11),
                    gt: new Date(new Date().getFullYear(), 0),
                },
            },
            orderBy: { codeId: "desc" },
        });
        const codeId = (maxCode?.codeId || 0) + 1;
        const productIds = products.map((product) => product.productId);
        const notReminderProducts = await this.prisma.product.findMany({
            where: {
                id: { in: productIds },
                countReminder: { lte: 0 },
                type: client_1.ProductType.DEVICE,
            },
        });
        if (notReminderProducts.length > 0) {
            throw new http_error_1.HttpError({
                message: `Maxsulot soni yetarli emas`,
            });
        }
        const subscriptions = await this.prisma.product.findMany({
            where: {
                id: { in: productIds },
                type: client_1.ProductType.SUBSCRIPTION,
            },
        });
        let state = client_1.SaleState.CLOSED;
        if (subscriptions.length > 0) {
            state = client_1.SaleState.RUNNING;
        }
        let sale = await this.prisma.sale.create({
            data: {
                date,
                subscribe_begin_date,
                subscribe_generate_day,
                code: `${new Date().getFullYear() - 2000}-${codeId}`,
                state,
                codeId,
                client: { connect: { id: clientId } },
                register: { connect: { id: creatorId } },
                modifier: { connect: { id: creatorId } },
            },
        });
        let totalPrice = 0;
        for (const product of products) {
            const saleProduct = await this.saleProductService.create({
                saleId: sale.id,
                count: product.count,
                price: product.price,
                productId: product.productId,
            }, creatorId);
            if (saleProduct.product.type === "SUBSCRIPTION") {
                const monthsPast = -(0, dayjs_1.default)(sale.subscribe_begin_date)
                    .set("days", sale.subscribe_generate_day)
                    .diff(new Date(), "months");
                for (let i = monthsPast; i + 1 > 0; i--) {
                    await this.subscribeService.create({
                        clientId: sale.clientId,
                        paid: 0,
                        price: saleProduct.price * saleProduct.count,
                        saleId: sale.id,
                        state: client_1.SubscribeState.NOTPAYING,
                        payingDate: (0, dayjs_1.default)(new Date()).add(-i, "months").toDate(),
                    });
                }
            }
            totalPrice += saleProduct.priceCount;
        }
        await this.prisma.$transaction(async (tx) => {
            const client = await tx.client.findFirst({ where: { id: clientId } });
            if (client.balance < totalPrice) {
                const newBalance = client.balance - totalPrice;
                const paidAmount = Math.max(client.balance, 0);
                sale = await tx.sale.update({
                    where: { id: sale.id },
                    data: {
                        price: totalPrice,
                        credit: totalPrice - paidAmount,
                        dept: paidAmount,
                    },
                    include: { SaleProduct: { include: { product: true } } },
                });
                await tx.client.update({
                    where: { id: client.id },
                    data: { balance: newBalance },
                });
            }
            else {
                const newBalance = client.balance - totalPrice;
                sale = await tx.sale.update({
                    where: { id: sale.id },
                    data: {
                        price: totalPrice,
                        credit: 0,
                        dept: totalPrice,
                    },
                    include: { SaleProduct: { include: { product: true } } },
                });
                await tx.client.update({
                    where: { id: client.id },
                    data: { balance: newBalance },
                });
            }
        });
        return sale;
    }
    async findAll(dto) {
        const { limit = 10, page = 1, minPrice, maxPrice, fromDate, toDate, clientId, code, credit, } = dto;
        const where = {
            isDeleted: false,
        };
        if (clientId) {
            where.clientId = clientId;
        }
        if (credit !== undefined) {
            if (credit === true) {
                where.credit = { gt: 0 };
            }
            else {
                where.credit = { equals: 0 };
            }
        }
        if (code) {
            where.code = {
                startsWith: code,
                mode: "insensitive",
            };
        }
        if (minPrice || maxPrice) {
            where.price = {
                ...(minPrice && { gte: minPrice }),
                ...(maxPrice && { lte: maxPrice }),
            };
        }
        if (fromDate || toDate) {
            where.date = {
                ...(fromDate && { gte: fromDate }),
                ...(toDate && { lte: toDate }),
            };
        }
        const [data, total] = await this.prisma.$transaction([
            this.prisma.sale.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                include: {
                    SaleProduct: { include: { product: true } },
                    modifier: true,
                    register: true,
                    client: true,
                },
                orderBy: {
                    date: "desc",
                },
            }),
            this.prisma.sale.count({ where }),
        ]);
        return {
            total,
            page,
            limit,
            data,
        };
    }
    async findOne(id) {
        const sale = await this.prisma.sale.findFirst({
            where: {
                id,
                isDeleted: false,
            },
            include: {
                SaleProduct: true,
                client: { include: { Region: true, District: true } },
            },
        });
        if (!sale) {
            throw new http_error_1.HttpError({
                message: `Sale with ID ${id} not found`,
            });
        }
        return sale;
    }
    async update(id, updateSaleDto) {
        const sale = await this.prisma.sale.findFirst({
            where: {
                id,
                isDeleted: false,
            },
        });
        if (!sale) {
            throw new http_error_1.HttpError({
                message: `Sale with ID ${id} not found`,
            });
        }
        return this.prisma.sale.update({
            where: { id },
            data: {
                subscribe_begin_date: updateSaleDto.subscribe_begin_date ?? sale.subscribe_begin_date,
                subscribe_generate_day: updateSaleDto.subscribe_generate_day ?? sale.subscribe_generate_day,
                date: updateSaleDto.date ?? sale.date,
            },
        });
    }
    async remove(id) {
        const sale = await this.prisma.sale.findFirst({
            where: {
                id,
                isDeleted: false,
            },
        });
        if (!sale) {
            throw new http_error_1.HttpError({
                message: `Sale with ID ${id} not found`,
            });
        }
        return this.prisma.sale.update({
            where: { id },
            data: { isDeleted: true },
        });
    }
};
exports.SaleService = SaleService;
exports.SaleService = SaleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        sale_product_service_1.SaleProductService,
        subscribe_service_1.SubscribeService])
], SaleService);
//# sourceMappingURL=sale.service.js.map