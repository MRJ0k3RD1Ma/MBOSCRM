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
exports.PaidOtherGroupService = void 0;
const common_1 = require("@nestjs/common");
const http_error_1 = require("../../common/exception/http.error");
const prisma_service_1 = require("../prisma/prisma.service");
const config_1 = require("../../common/config");
const faker_1 = require("@faker-js/faker");
let PaidOtherGroupService = class PaidOtherGroupService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async onModuleInit() {
        if (config_1.env.ENV != 'prod') {
            const count = await this.prisma.paidOtherGroup.count();
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
    async create(createPaidOtherGroupDto) {
        const paidOtherGroup = await this.prisma.paidOtherGroup.create({
            data: { ...createPaidOtherGroupDto },
        });
        return paidOtherGroup;
    }
    async findAll(dto) {
        const { limit = 10, page = 1, name } = dto;
        const [data, total] = await this.prisma.$transaction([
            this.prisma.paidOtherGroup.findMany({
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
            this.prisma.paidOtherGroup.count({
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
        const paidOtherGroup = await this.prisma.paidOtherGroup.findUnique({
            where: { id, isDeleted: false },
        });
        if (!paidOtherGroup) {
            throw (0, http_error_1.HttpError)({ code: 'PaidOtherGroup not found' });
        }
        return paidOtherGroup;
    }
    async update(id, dto) {
        const paidOtherGroup = await this.prisma.paidOtherGroup.findUnique({
            where: { id, isDeleted: false },
        });
        if (!paidOtherGroup)
            throw (0, http_error_1.HttpError)({ code: 'PaidOtherGroup not found' });
        const updateData = {
            name: dto.name || paidOtherGroup.name,
        };
        const updatedPaidOtherGroup = await this.prisma.paidOtherGroup.update({
            where: { id },
            data: updateData,
        });
        return updatedPaidOtherGroup;
    }
    async remove(id) {
        const paidOtherGroup = await this.prisma.paidOtherGroup.findUnique({
            where: { id: id, isDeleted: false },
        });
        if (!paidOtherGroup) {
            throw (0, http_error_1.HttpError)({ code: 'PaidOtherGroup not found' });
        }
        return await this.prisma.paidOtherGroup.update({
            where: { id: id },
            data: { isDeleted: true },
        });
    }
};
exports.PaidOtherGroupService = PaidOtherGroupService;
exports.PaidOtherGroupService = PaidOtherGroupService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaidOtherGroupService);
//# sourceMappingURL=paid-other-group.service.js.map