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
exports.SaleTodoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const http_error_1 = require("../../common/exception/http.error");
const client_1 = require("@prisma/client");
const todo_service_1 = require("../todo/todo.service");
const uuid_1 = require("uuid");
let SaleTodoService = class SaleTodoService {
    constructor(prisma, todo) {
        this.prisma = prisma;
        this.todo = todo;
    }
    async create(createSaleTodoDto, user) {
        const sale = await this.prisma.sale.findFirst({
            where: { id: createSaleTodoDto.saleId, isDeleted: false },
            include: { SaleFeedback: true },
        });
        if (!sale) {
            throw new http_error_1.HttpError({ message: 'Sale not found' });
        }
        let feedbackId;
        if (sale.SaleFeedback) {
            feedbackId = sale.SaleFeedback.id;
        }
        else {
            const newFeedback = await this.prisma.saleFeedback.create({
                data: {
                    saleId: sale.id,
                    alias: (0, uuid_1.v4)(),
                    state: client_1.SaleFeedbackState.TODO,
                    result: client_1.SaleFeedbackResult.NOT_COMPLETED,
                    score: 0,
                },
            });
            feedbackId = newFeedback.id;
        }
        return this.prisma.saleTodo.create({
            data: {
                name: createSaleTodoDto.name,
                saleId: sale.id,
                feedbackId,
                registerId: user,
                modifyId: user,
            },
        });
    }
    async findAll(dto) {
        const { page, limit, name, isCompleted, saleId, feedbackId } = dto;
        const where = { isDeleted: false };
        if (name) {
            where.name = { contains: name, mode: 'insensitive' };
        }
        if (isCompleted !== undefined) {
            where.isCompleted = isCompleted;
        }
        if (saleId) {
            where.saleId = saleId;
        }
        if (feedbackId) {
            where.feedbackId = feedbackId;
        }
        const [data, total] = await this.prisma.$transaction([
            this.prisma.saleTodo.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.saleTodo.count({ where }),
        ]);
        return { data, total, page, limit };
    }
    async findOne(id) {
        const saleTodo = await this.prisma.saleTodo.findFirst({
            where: { id, isDeleted: false },
        });
        if (!saleTodo) {
            throw new http_error_1.HttpError({ message: 'SaleTodo not found' });
        }
        return saleTodo;
    }
    async update(id, updateSaleTodoDto) {
        const saleTodo = await this.prisma.saleTodo.findFirst({
            where: { id, isDeleted: false },
        });
        if (!saleTodo) {
            throw new http_error_1.HttpError({ message: 'SaleTodo not found' });
        }
        if (updateSaleTodoDto.saleId) {
            const sale = await this.prisma.sale.findFirst({
                where: { id: updateSaleTodoDto.saleId, isDeleted: false },
            });
            if (!sale) {
                throw new http_error_1.HttpError({ message: 'Sale not found' });
            }
        }
        return this.prisma.saleTodo.update({
            where: { id },
            data: {
                saleId: updateSaleTodoDto.saleId ?? saleTodo.saleId,
                name: updateSaleTodoDto.name ?? saleTodo.name,
                isCompleted: updateSaleTodoDto.isCompleted ?? saleTodo.isCompleted,
                updatedAt: new Date(),
            },
        });
    }
    async remove(id) {
        const saleTodo = await this.prisma.saleTodo.findFirst({
            where: { id, isDeleted: false },
        });
        if (!saleTodo) {
            throw new http_error_1.HttpError({ message: 'SaleTodo not found' });
        }
        await this.prisma.saleTodo.update({
            where: { id },
            data: { isDeleted: true, updatedAt: new Date() },
        });
        return { message: `SaleTodo #${id} removed successfully` };
    }
};
exports.SaleTodoService = SaleTodoService;
exports.SaleTodoService = SaleTodoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, todo_service_1.TodoService])
], SaleTodoService);
//# sourceMappingURL=sale-todo.service.js.map