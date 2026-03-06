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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const event_emitter_1 = require("@nestjs/event-emitter");
const sale_feedback_service_1 = require("../sale-feedback/sale-feedback.service");
const nestjs_1 = require("@grammyjs/nestjs");
const grammy_1 = require("grammy");
const dayjs_1 = __importDefault(require("dayjs"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
dayjs_1.default.extend(timezone_1.default);
dayjs_1.default.extend(utc_1.default);
let SaleService = class SaleService {
    constructor(prisma, saleProductService, saleFeedback, eventEmitter, bot) {
        this.prisma = prisma;
        this.saleProductService = saleProductService;
        this.saleFeedback = saleFeedback;
        this.eventEmitter = eventEmitter;
        this.bot = bot;
    }
    async onModuleInit() {
        (async () => {
            const sales = await this.prisma.sale.findMany({
                where: { isDeleted: false },
                select: { id: true },
            });
            for (let sale of sales) {
                await this.recalculateSale(sale.id);
            }
        })();
    }
    async recalculateSale(saleId) {
        const saleProducts = await this.prisma.saleProduct.findMany({
            where: { saleId, isDeleted: false },
            select: { priceCount: true },
        });
        const totalPrice = saleProducts.reduce((sum, sp) => sum + sp.priceCount, 0);
        const sale = await this.prisma.sale.findFirst({
            where: { id: saleId },
        });
        if (!sale)
            return;
        const currentDept = sale.dept || 0;
        const newCredit = Math.max(0, totalPrice - currentDept);
        await this.prisma.sale.update({
            where: { id: saleId },
            data: {
                price: totalPrice,
                credit: newCredit,
            },
        });
    }
    async sendNotification(saleId) {
        const sale = await this.prisma.sale.findFirst({
            where: { id: saleId, isDeleted: false },
            include: {
                client: true,
                register: true,
                SaleProduct: { include: { product: true } },
            },
        });
        if (!sale)
            return;
        const message = `
Sotuv

${sale.SaleProduct.map((v) => `${v.count}x ${v.product.name}- ${v.priceCount} So'm`).join('\n')}

Mijoz: ${sale.client.name}

Kiritdi: ${sale.register.name}

Vaqt: ${(0, dayjs_1.default)(sale.date).format('DD-MM-YYYY')}
    `;
        const users = await this.prisma.user.findMany({
            where: { UserRole: { name: 'superadmin' } },
        });
        for (const user of users) {
            if (!user.chatId)
                continue;
            try {
                await this.bot.api.sendMessage(user.chatId, message);
            }
            catch (e) {
                console.log(e);
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
            orderBy: { codeId: 'desc' },
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
                price: 0,
                credit: 0,
                dept: 0,
                state,
                codeId,
                client: { connect: { id: clientId } },
                register: { connect: { id: creatorId } },
                modifier: { connect: { id: creatorId } },
            },
        });
        for (const product of products) {
            await this.saleProductService.create({
                saleId: sale.id,
                count: product.count,
                price: product.price,
                productId: product.productId,
            }, creatorId);
        }
        sale = await this.prisma.sale.findUnique({
            where: { id: sale.id },
            include: { SaleProduct: { include: { product: true } } },
        });
        const totalPrice = sale.price;
        await this.prisma.$transaction(async (tx) => {
            const client = await tx.client.findFirst({ where: { id: clientId } });
            if (client.balance < totalPrice) {
                const newBalance = client.balance - totalPrice;
                const paidAmount = Math.max(client.balance, 0);
                sale = await tx.sale.update({
                    where: { id: sale.id },
                    data: {
                        credit: sale.price - paidAmount,
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
        await this.saleFeedback.create({ saleId: sale.id });
        this.eventEmitter.emit('recalculate.client', sale.clientId);
        this.eventEmitter.emit('recalculate.subscribe', await this.prisma.sale.findUnique({
            where: { id: sale.id },
            include: { SaleProduct: true },
        }));
        this.sendNotification(sale.id);
        return sale;
    }
    async findAll(dto) {
        const { limit = 10, page = 1, minPrice, maxPrice, fromDate, toDate, clientId, code, credit, } = dto;
        const where = { isDeleted: false };
        if (clientId !== undefined)
            where.clientId = clientId;
        if (credit !== undefined) {
            where.credit = credit ? { gt: 0 } : { equals: 0 };
        }
        if (code?.trim()) {
            where.code = { startsWith: code.trim(), mode: 'insensitive' };
        }
        if (minPrice !== undefined || maxPrice !== undefined) {
            where.price = {
                ...(minPrice !== undefined && { gte: minPrice }),
                ...(maxPrice !== undefined && { lte: maxPrice }),
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
                orderBy: { id: 'desc' },
            }),
            this.prisma.sale.aggregate({
                where,
                _sum: { price: true },
                _count: { _all: true },
            }),
        ]);
        return {
            total: total._count._all,
            price: total._sum.price,
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
                SaleFeedback: true,
                SaleTodo: true,
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
                state: updateSaleDto.state ?? sale.state,
            },
        });
    }
    async remove(id) {
        let sale = await this.prisma.sale.findFirst({
            where: {
                id,
                isDeleted: false,
            },
            include: { SaleProduct: { where: { isDeleted: false } } },
        });
        if (!sale) {
            throw new http_error_1.HttpError({
                message: `Sale with ID ${id} not found`,
            });
        }
        sale.SaleProduct.forEach((saleProduct) => {
            this.saleProductService.remove(saleProduct.id);
        });
        await this.prisma.client.update({
            where: { id: sale.clientId },
            data: { balance: { increment: sale.dept } },
        });
        sale = await this.prisma.sale.update({
            where: { id },
            data: { isDeleted: true },
        });
        this.eventEmitter.emit('recalculate.client', sale.clientId);
    }
};
exports.SaleService = SaleService;
exports.SaleService = SaleService = __decorate([
    (0, common_1.Injectable)(),
    __param(4, (0, nestjs_1.InjectBot)()),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        sale_product_service_1.SaleProductService,
        sale_feedback_service_1.SaleFeedbackService,
        event_emitter_1.EventEmitter2,
        grammy_1.Bot])
], SaleService);
//# sourceMappingURL=sale.service.js.map