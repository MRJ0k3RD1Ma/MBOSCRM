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
exports.SaleFeedbackService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const http_error_1 = require("../../common/exception/http.error");
const client_1 = require("@prisma/client");
const uuid_1 = require("uuid");
let SaleFeedbackService = class SaleFeedbackService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createSaleFeedbackDto) {
        const sale = await this.prisma.sale.findUnique({
            where: { id: createSaleFeedbackDto.saleId },
        });
        if (!sale) {
            throw new http_error_1.HttpError({ message: 'Sale not found' });
        }
        const saleFeedback = await this.prisma.saleFeedback.create({
            data: {
                name: createSaleFeedbackDto.name,
                alias: (0, uuid_1.v4)(),
                saleId: createSaleFeedbackDto.saleId,
                description: createSaleFeedbackDto.description,
                score: createSaleFeedbackDto.score,
                state: client_1.SaleFeedbackState.TODO,
                result: client_1.SaleFeedbackResult.NOT_COMPLETED,
            },
        });
        return saleFeedback;
    }
    async findAll(dto) {
        const { page, limit, name, state, result, saleId } = dto;
        const where = {
            isDeleted: false,
        };
        if (dto.name) {
            where.name = { contains: name, mode: 'insensitive' };
        }
        if (dto.state) {
            where.state = state;
        }
        if (dto.result) {
            where.result = result;
        }
        if (dto.saleId) {
            where.saleId = saleId;
        }
        const [data, total] = await this.prisma.$transaction([
            this.prisma.saleFeedback.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.saleFeedback.count({ where }),
        ]);
        return {
            data,
            total,
            page,
            limit,
        };
    }
    async findOne(id) {
        const saleFeedback = await this.prisma.saleFeedback.findFirst({
            where: {
                id,
                isDeleted: false,
            },
        });
        if (!saleFeedback) {
            throw new http_error_1.HttpError({
                message: `SaleFeedback with ID ${id} not found`,
            });
        }
        return saleFeedback;
    }
    async findOneByAlias(alias) {
        const saleFeedback = await this.prisma.saleFeedback.findFirst({
            where: {
                alias,
                isDeleted: false,
            },
        });
        if (!saleFeedback) {
            throw new http_error_1.HttpError({
                message: `SaleFeedback with alias ${alias} not found`,
            });
        }
        return saleFeedback;
    }
    async update(alias, updateSaleFeedbackDto) {
        const saleFeedback = await this.prisma.saleFeedback.findFirst({
            where: { alias }
        });
        if (!saleFeedback) {
            throw new http_error_1.HttpError({ message: 'SaleFeedback not found' });
        }
        return this.prisma.saleFeedback.update({
            where: { id: saleFeedback.id },
            data: {
                name: updateSaleFeedbackDto.name ?? saleFeedback.name,
                description: updateSaleFeedbackDto.description ?? saleFeedback.description,
                saleId: saleFeedback.saleId,
                score: updateSaleFeedbackDto.score ?? saleFeedback.score,
                state: updateSaleFeedbackDto.state ?? saleFeedback.state,
                result: updateSaleFeedbackDto.result ?? saleFeedback.result,
            },
        });
    }
    async updateState(dto, alias) {
        const saleFeedback = await this.prisma.saleFeedback.findFirst({
            where: { alias: alias },
        });
        if (!saleFeedback) {
            throw new http_error_1.HttpError({ message: 'SaleFeedback not found' });
        }
        return this.prisma.saleFeedback.update({
            where: { id: saleFeedback.id },
            data: {
                state: dto.state,
            },
        });
    }
    async remove(id) {
        const saleFeedback = await this.prisma.saleFeedback.findFirst({
            where: { id, isDeleted: false },
        });
        if (!saleFeedback) {
            throw new http_error_1.HttpError({ message: 'SaleFeedback not found' });
        }
        return this.prisma.saleFeedback.update({
            where: { id },
            data: { isDeleted: true },
        });
    }
};
exports.SaleFeedbackService = SaleFeedbackService;
exports.SaleFeedbackService = SaleFeedbackService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SaleFeedbackService);
//# sourceMappingURL=sale-feedback.service.js.map