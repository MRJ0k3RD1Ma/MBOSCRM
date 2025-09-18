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
const config_1 = require("../../common/config");
const faker_1 = require("@faker-js/faker");
let SaleTodoService = class SaleTodoService {
    constructor(prisma) {
        this.prisma = prisma;
        this.searchCache = new Map();
    }
    async onModuleInit() {
        if (config_1.env.ENV != 'prod') {
            const count = await this.prisma.todo.count();
            const requiredCount = 10000;
            if (count < requiredCount) {
                for (let i = count; i < requiredCount; i++) {
                    await this.createTodo({
                        name: faker_1.faker.word.words(10),
                    });
                }
            }
        }
    }
    async createTodo(createTodoDto) {
        const todo = await this.prisma.todo.create({
            data: {
                name: createTodoDto.name,
            },
        });
        return todo;
    }
    async searchTodo(query) {
        const cache = this.searchCache.get(query);
        if (cache)
            return cache;
        const todos = await this.prisma.todo.findMany({
            where: { name: { contains: query, mode: 'insensitive' } },
            take: 10,
        });
        this.searchCache.set(query, JSON.stringify(todos));
        return todos;
    }
};
exports.SaleTodoService = SaleTodoService;
exports.SaleTodoService = SaleTodoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SaleTodoService);
//# sourceMappingURL=saleTodo.service.js.map