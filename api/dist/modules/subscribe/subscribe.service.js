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
let SubscribeService = class SubscribeService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async cron() {
        const subscribeSales = await this.prisma.saleProduct.findMany({
            where: {
                is_subscribe: true,
            },
            include: { sale: true, product: true },
        });
        for (const subscribeSale of subscribeSales) {
            const subscribe = await this.prisma.subscribe.findFirst({
                where: {
                    saleId: subscribeSale.saleId,
                    paying_date: {
                        gt: (0, dayjs_1.default)(new Date())
                            .set("day", subscribeSale.sale.subscribe_generate_day + 1)
                            .toDate(),
                    },
                },
            });
            if (!subscribe) {
                this.create({
                    clientId: subscribeSale.sale.clientId,
                    paid: 0,
                    price: subscribeSale.price * subscribeSale.count,
                    saleId: subscribeSale.saleId,
                    state: client_1.SubscribeState.NOTPAYING,
                    payingDate: (0, dayjs_1.default)(new Date())
                        .add(1, "month")
                        .set("day", subscribeSale.sale.subscribe_generate_day)
                        .toDate(),
                });
            }
        }
    }
    async create(createSubscribeDto) {
        const { clientId, paid, price, saleId, state, payingDate } = createSubscribeDto;
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
                paid,
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
                            SaleProduct: {
                                include: { product: true },
                                where: { product: { type: client_1.ProductType.SUBSCRIPTION } },
                            },
                        },
                    },
                },
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
        return this.prisma.subscribe.update({
            where: { id },
            data: { isDeleted: true },
        });
    }
};
exports.SubscribeService = SubscribeService;
__decorate([
    (0, schedule_1.Cron)("* * 8 * * *"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubscribeService.prototype, "cron", null);
exports.SubscribeService = SubscribeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SubscribeService);
//# sourceMappingURL=subscribe.service.js.map