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
exports.PaidClientService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const http_error_1 = require("../../common/exception/http.error");
const client_1 = require("@prisma/client");
let PaidClientService = class PaidClientService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createPaidClientDto, registerId) {
        const { clientId, saleId, paymentId, paidDate, price } = createPaidClientDto;
        if (clientId) {
            const client = await this.prisma.client.findFirst({
                where: { id: clientId, isDeleted: false },
            });
            if (!client) {
                throw new http_error_1.HttpError({
                    message: `Client with ID ${clientId} not found or deleted`,
                });
            }
        }
        if (paymentId) {
            const payment = await this.prisma.payment.findFirst({
                where: { id: paymentId, isDeleted: false },
            });
            if (!payment) {
                throw new http_error_1.HttpError({
                    message: `Payment with ID ${paymentId} not found or deleted`,
                });
            }
        }
        const paidClient = await this.prisma.paidClient.create({
            data: {
                clientId,
                saleId,
                paymentId,
                paidDate,
                price,
                registerId,
            },
        });
        if (clientId) {
            const client = await this.prisma.client.findFirst({
                where: { id: clientId, isDeleted: false },
            });
            if (!client) {
                throw new http_error_1.HttpError({
                    message: `Client with ID ${clientId} not found or deleted`,
                });
            }
            await this.processPayment(client.id, price, saleId);
        }
        return paidClient;
    }
    async processPayment(clientId, paymentAmount, saleId) {
        const client = await this.prisma.client.findUnique({
            where: { id: clientId },
        });
        if (!client)
            throw new Error('Client not found');
        let remainingPayment = paymentAmount;
        let currentBalance = client.balance ?? 0;
        let sales = await this.prisma.sale.findMany({
            where: { clientId, credit: { gt: 0 }, id: { not: saleId } },
            orderBy: { createdAt: 'asc' },
        });
        if (saleId) {
            const prioritySale = await this.prisma.sale.findFirst({
                where: { id: saleId },
            });
            sales = [prioritySale, ...sales];
        }
        for (const sale of sales) {
            if (remainingPayment <= 0)
                break;
            const payAmount = Math.min(sale.credit, remainingPayment);
            await this.prisma.sale.update({
                where: { id: sale.id },
                data: {
                    credit: sale.credit - payAmount,
                    dept: (sale.dept ?? 0) + payAmount,
                    ...(sale.credit - payAmount <= 0 ? { state: 'CLOSED' } : {}),
                },
            });
            remainingPayment -= payAmount;
            currentBalance += payAmount;
        }
        const result = await this.checkSubscribtions(clientId, remainingPayment, currentBalance);
        remainingPayment = result.remainingPayment;
        currentBalance = result.currentBalance;
        if (remainingPayment > 0) {
            currentBalance += remainingPayment;
            remainingPayment = 0;
        }
        await this.prisma.client.update({
            where: { id: clientId },
            data: { balance: currentBalance },
        });
        return { paidAmount: paymentAmount, newBalance: currentBalance };
    }
    async checkSubscribtions(clientId, paymentAmount, currentBalance) {
        const subscribtions = await this.prisma.subscribe.findMany({
            where: { state: client_1.SubscribeState.NOTPAYING, clientId },
        });
        let remainingPayment = paymentAmount;
        for (const subscribe of subscribtions) {
            if (remainingPayment <= 0)
                break;
            const credit = subscribe.price - subscribe.paid;
            const payAmount = Math.min(credit, remainingPayment);
            await this.prisma.subscribe.update({
                where: { id: subscribe.id },
                data: {
                    paid: subscribe.paid + payAmount,
                    state: subscribe.paid + payAmount == subscribe.price
                        ? client_1.SubscribeState.PAID
                        : client_1.SubscribeState.NOTPAYING,
                },
            });
            remainingPayment -= payAmount;
            currentBalance += payAmount;
        }
        this.prisma.client.update({
            where: { id: clientId },
            data: { balance: currentBalance },
        });
        return { remainingPayment, currentBalance };
    }
    async findAll(dto) {
        const { minPrice, maxPrice, fromDate, toDate, clientId, saleId, paymentId, } = dto;
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
        if (clientId) {
            where.clientId = clientId;
        }
        if (saleId) {
            where.saleId = saleId;
        }
        if (paymentId) {
            where.paymentId = paymentId;
        }
        return this.prisma.paidClient.findMany({
            where,
            include: {
                Client: true,
                Sale: true,
                Payment: true,
                modify: true,
                register: true,
            },
        });
    }
    async findOne(id) {
        const paidClient = await this.prisma.paidClient.findFirst({
            where: { id, isDeleted: false },
            include: {
                Client: true,
                Sale: true,
                Payment: true,
            },
        });
        if (!paidClient) {
            throw new http_error_1.HttpError({ message: `PaidClient with ID ${id} not found` });
        }
        return paidClient;
    }
    async update(id, updatePaidClientDto) {
        const paidClient = await this.prisma.paidClient.findFirst({
            where: {
                id,
                isDeleted: false,
            },
        });
        if (!paidClient) {
            throw new http_error_1.HttpError({ message: `PaidClient with ID ${id} not found` });
        }
        const { clientId, saleId, paymentId } = updatePaidClientDto;
        if (clientId) {
            const client = await this.prisma.client.findFirst({
                where: { id: clientId, isDeleted: false },
            });
            if (!client) {
                throw new http_error_1.HttpError({
                    message: `Client with ID ${clientId} not found`,
                });
            }
        }
        if (saleId) {
            const sale = await this.prisma.sale.findFirst({
                where: { id: saleId, isDeleted: false },
            });
            if (!sale) {
                throw new http_error_1.HttpError({ message: `Sale with ID ${saleId} not found` });
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
        return this.prisma.paidClient.update({
            where: { id },
            data: {
                clientId: updatePaidClientDto.clientId ?? paidClient.clientId,
                saleId: updatePaidClientDto.saleId ?? paidClient.saleId,
                paymentId: updatePaidClientDto.paymentId ?? paidClient.paymentId,
                paidDate: updatePaidClientDto.paidDate ?? paidClient.paidDate,
                price: updatePaidClientDto.price ?? paidClient.price,
            },
        });
    }
    async remove(id) {
        const paidClient = await this.prisma.paidClient.findFirst({
            where: { id, isDeleted: false },
        });
        if (!paidClient) {
            throw new http_error_1.HttpError({ message: `PaidClient with ID ${id} not found` });
        }
        const result = await this.prisma.paidClient.update({
            where: { id },
            data: { isDeleted: true },
        });
        return result;
    }
};
exports.PaidClientService = PaidClientService;
exports.PaidClientService = PaidClientService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaidClientService);
//# sourceMappingURL=paid-client.service.js.map