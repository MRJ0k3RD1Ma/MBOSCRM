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
exports.SubscribeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const http_error_1 = require("../../common/exception/http.error");
const client_1 = require("@prisma/client");
const schedule_1 = require("@nestjs/schedule");
const dayjs_1 = __importDefault(require("dayjs"));
const event_emitter_1 = require("@nestjs/event-emitter");
let SubscribeService = class SubscribeService {
    constructor(prisma, eventEmitter) {
        this.prisma = prisma;
        this.eventEmitter = eventEmitter;
    }
    async onModuleInit() {
        await this.cron();
    }
    async handleSaleCreatedEvent(sale) {
        const saleProduct = await this.prisma.saleProduct.findFirst({
            where: {
                saleId: sale.id,
                product: { type: client_1.ProductType.SUBSCRIPTION },
            },
        });
        if (!saleProduct) {
            return;
        }
        let loopMonth = (0, dayjs_1.default)(sale.subscribe_begin_date)
            .startOf("month")
            .set("day", sale.subscribe_generate_day);
        while (loopMonth.isSame((0, dayjs_1.default)(), "month") ||
            loopMonth.isBefore((0, dayjs_1.default)(), "month")) {
            const client = await this.prisma.client.findUnique({
                where: { id: sale.clientId },
            });
            await this.create({
                clientId: sale.clientId,
                price: saleProduct.price * saleProduct.count,
                saleId: sale.id,
                state: client_1.SubscribeState.NOTPAYING,
                payingDate: loopMonth.toDate(),
            });
            loopMonth = loopMonth.add(1, "months");
        }
    }
    async cron() {
        const runningSales = await this.prisma.sale.findMany({
            where: {
                isDeleted: false,
                state: "RUNNING",
            },
        });
        for (const sale of runningSales) {
            const lastSubscribe = await this.prisma.subscribe.findFirst({
                where: { saleId: sale.id },
                orderBy: { paying_date: "desc" },
            });
            if (!lastSubscribe) {
                continue;
            }
            const today = (0, dayjs_1.default)();
            const nextPaymentDate = (0, dayjs_1.default)(lastSubscribe.paying_date).add(1, "month");
            if (nextPaymentDate.isBefore(today) ||
                nextPaymentDate.isSame(today, "day")) {
                const saleProduct = await this.prisma.saleProduct.findFirst({
                    where: {
                        saleId: sale.id,
                        product: { type: client_1.ProductType.SUBSCRIPTION },
                    },
                });
                if (saleProduct) {
                    await this.create({
                        clientId: sale.clientId,
                        price: saleProduct.price * saleProduct.count,
                        saleId: sale.id,
                        state: client_1.SubscribeState.NOTPAYING,
                        payingDate: nextPaymentDate.toDate(),
                    });
                }
            }
        }
    }
    async create(createSubscribeDto) {
        const { clientId, price, saleId, state, payingDate } = createSubscribeDto;
        const client = await this.prisma.client.findFirst({
            where: { id: clientId, isDeleted: false },
        });
        if (!client) {
            throw new http_error_1.HttpError({
                message: `Client with ID ${clientId} not found`,
            });
        }
        const sale = await this.prisma.sale.findFirst({
            where: { id: saleId, isDeleted: false },
        });
        if (!sale) {
            throw new http_error_1.HttpError({
                message: `Sale with ID ${saleId} not found`,
            });
        }
        const subscribe = await this.prisma.subscribe.create({
            data: {
                paid: 0,
                paying_date: payingDate,
                price,
                state,
                sale: { connect: { id: saleId } },
                client: { connect: { id: clientId } },
            },
        });
        await this.prisma.client.update({
            where: { id: clientId },
            data: { balance: client.balance - price },
        });
        this.eventEmitter.emit("recalculate.client", subscribe.clientId);
        return subscribe;
    }
    async findAll(dto) {
        const { limit = 10, page = 1, minPrice, maxPrice, fromDate, toDate, clientId, state, saleId, } = dto;
        const where = {
            isDeleted: false,
        };
        if (clientId) {
            where.clientId = clientId;
        }
        if (saleId) {
            where.saleId = saleId;
        }
        if (minPrice || maxPrice) {
            where.price = {
                ...(minPrice && { gte: minPrice }),
                ...(maxPrice && { lte: maxPrice }),
            };
        }
        if (fromDate || toDate) {
            where.paying_date = {
                ...(fromDate && { gte: fromDate }),
                ...(toDate && { lte: toDate }),
            };
        }
        if (state) {
            where.state = { equals: state };
        }
        const [data, total] = await this.prisma.$transaction([
            this.prisma.subscribe.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                include: {
                    client: true,
                    sale: {
                        include: {
                            PaidClient: {
                                include: { Payment: true },
                            },
                        },
                    },
                },
                orderBy: { id: "desc" },
            }),
            this.prisma.subscribe.count({ where }),
        ]);
        return {
            total,
            page,
            limit,
            data,
        };
    }
    async findOne(id) {
        const subscribe = await this.prisma.subscribe.findFirst({
            where: {
                id,
                isDeleted: false,
            },
            include: {
                client: true,
                sale: {
                    include: {
                        PaidClient: {
                            include: { Payment: true },
                        },
                        SaleProduct: {
                            include: { product: true },
                            where: { product: { type: client_1.ProductType.SUBSCRIPTION } },
                        },
                    },
                },
            },
        });
        if (!subscribe) {
            throw new http_error_1.HttpError({
                message: `Subscribe with ID ${id} not found`,
            });
        }
        return subscribe;
    }
    async update(id, updateSubscribeDto) {
        let subscribe = await this.prisma.subscribe.findFirst({
            where: {
                id,
                isDeleted: false,
            },
        });
        if (!subscribe) {
            throw new http_error_1.HttpError({
                message: `Subscribe with ID ${id} not found`,
            });
        }
        subscribe = await this.prisma.subscribe.update({
            where: { id },
            data: {
                paying_date: updateSubscribeDto.payingDate ?? subscribe.paying_date,
                paid: updateSubscribeDto.paid ?? subscribe.paid,
                price: updateSubscribeDto.price ?? subscribe.price,
                state: updateSubscribeDto.state ?? subscribe.state,
            },
        });
        return subscribe;
    }
    async remove(id) {
        const subscribe = await this.prisma.subscribe.findFirst({
            where: {
                id,
                isDeleted: false,
            },
        });
        if (!subscribe) {
            throw new http_error_1.HttpError({
                message: `Subscribe with ID ${id} not found`,
            });
        }
        this.eventEmitter.emit("recalculate.client", subscribe.clientId);
        return this.prisma.subscribe.update({
            where: { id },
            data: { isDeleted: true },
        });
    }
};
exports.SubscribeService = SubscribeService;
__decorate([
    (0, event_emitter_1.OnEvent)("recalculate.subscribe"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubscribeService.prototype, "handleSaleCreatedEvent", null);
__decorate([
    (0, schedule_1.Cron)("0 0 * * * *"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubscribeService.prototype, "cron", null);
exports.SubscribeService = SubscribeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        event_emitter_1.EventEmitter2])
], SubscribeService);
//# sourceMappingURL=subscribe.service.js.map