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
exports.ClientTypeService = void 0;
const common_1 = require("@nestjs/common");
const http_error_1 = require("../../common/exception/http.error");
const prisma_service_1 = require("../prisma/prisma.service");
const config_1 = require("../../common/config");
const faker_1 = require("@faker-js/faker");
let ClientTypeService = class ClientTypeService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async onModuleInit() {
        if (config_1.env.ENV != 'prod') {
            const count = await this.prisma.clientType.count();
            const requiredCount = 5;
            if (count < requiredCount) {
                for (let i = count; i < requiredCount; i++) {
                    await this.create({
                        name: faker_1.faker.person.jobType(),
                    });
                }
            }
        }
    }
    async create(createClientTypeDto) {
        const clientType = await this.prisma.clientType.create({
            data: { ...createClientTypeDto },
        });
        return clientType;
    }
    async findAll(dto) {
        const { limit = 10, page = 1, name } = dto;
        const [data, total] = await this.prisma.$transaction([
            this.prisma.clientType.findMany({
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
            this.prisma.clientType.count({
                where: {
                    name: {
                        contains: name?.trim() || '',
                        mode: 'insensitive',
                    },
                    isDeleted: false,
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
        const clientType = await this.prisma.clientType.findFirst({
            where: { id, isDeleted: false },
        });
        if (!clientType) {
            throw (0, http_error_1.HttpError)({ code: 'ClientType not found' });
        }
        return clientType;
    }
    async update(id, dto) {
        const clientType = await this.prisma.clientType.findFirst({
            where: { id, isDeleted: false },
        });
        if (!clientType)
            throw (0, http_error_1.HttpError)({ code: 'ClientType not found' });
        const updateData = {
            name: dto.name || clientType.name,
        };
        const updatedClientType = await this.prisma.clientType.update({
            where: { id },
            data: updateData,
        });
        return updatedClientType;
    }
    async remove(id) {
        const clientType = await this.prisma.clientType.findFirst({
            where: { id: id, isDeleted: false },
        });
        if (!clientType) {
            throw (0, http_error_1.HttpError)({ code: 'ClientType not found' });
        }
        return await this.prisma.clientType.update({
            where: { id: id },
            data: { isDeleted: true },
        });
    }
};
exports.ClientTypeService = ClientTypeService;
exports.ClientTypeService = ClientTypeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClientTypeService);
//# sourceMappingURL=clientType.service.js.map