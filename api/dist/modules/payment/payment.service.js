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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const http_error_1 = require("../../common/exception/http.error");
const config_1 = require("../../common/config");
const faker_1 = require("@faker-js/faker");
let PaymentService = class PaymentService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async onModuleInit() {
        if (config_1.env.ENV != 'prod') {
            const count = await this.prisma.payment.count();
            const requiredCount = 5;
            if (count < requiredCount) {
                for (let i = count; i < requiredCount; i++) {
                    await this.create({
                        name: faker_1.faker.finance.creditCardIssuer(),
                        icon: faker_1.faker.internet.emoji(),
                    });
                }
            }
        }
    }
    async create(createPaymentDto) {
        const payment = await this.prisma.payment.create({
            data: {
                name: createPaymentDto.name,
                icon: createPaymentDto.icon,
            },
        });
        return payment;
    }
    async findAll(dto) {
        const { page = 10, limit = 10, name } = dto;
        const [data, total] = await this.prisma.$transaction([
            this.prisma.payment.findMany({
                where: {
                    name: {
                        contains: name?.trim() || '',
                        mode: 'insensitive',
                    },
                    isDeleted: false,
                },
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.payment.count({
                where: {
                    name: {
                        contains: name?.trim() || '',
                        mode: 'insensitive',
                    },
                },
            }),
        ]);
        return {
            total,
            page,
            limit,
            data,
        };
    }
    async findOne(id) {
        const payment = await this.prisma.payment.findFirst({
            where: {
                id,
                isDeleted: false,
            },
        });
        if (!payment) {
            throw new http_error_1.HttpError({ code: 'Payment not found' });
        }
        return payment;
    }
    async update(id, updatePaymentDto) {
        const existingPayment = await this.prisma.payment.findFirst({
            where: { id, isDeleted: false },
        });
        if (!existingPayment) {
            throw new http_error_1.HttpError({ message: `Payment with ID ${id} not found` });
        }
        return this.prisma.payment.update({
            where: { id },
            data: updatePaymentDto,
        });
    }
    async remove(id) {
        const payment = await this.prisma.payment.findFirst({
            where: { id, isDeleted: false },
        });
        if (!payment) {
            throw new http_error_1.HttpError({ message: `Payment with ID ${id} not found` });
        }
        return this.prisma.payment.update({
            where: { id },
            data: {
                isDeleted: true,
            },
        });
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentService);
//# sourceMappingURL=payment.service.js.map