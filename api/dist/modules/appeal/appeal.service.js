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
exports.AppealService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const http_error_1 = require("../../common/exception/http.error");
let AppealService = class AppealService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createAppealDto) {
        const appeal = await this.prisma.appeal.create({
            data: {
                name: createAppealDto.name,
                phone: createAppealDto.phone,
                subject: createAppealDto.subject,
                detail: createAppealDto.detail,
                state: createAppealDto.state
            }
        });
        return appeal;
    }
    async findAll(dto) {
        const { page = 1, limit = 10 } = dto;
        const [data, total] = await this.prisma.$transaction([
            this.prisma.appeal.findMany({
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { id: 'desc' },
            }),
            this.prisma.appeal.count({}),
        ]);
        return {
            total,
            page,
            limit,
            data,
        };
    }
    async findOne(id) {
        const appeal = await this.prisma.appeal.findFirst({
            where: {
                id,
            },
        });
        if (!appeal) {
            throw new http_error_1.HttpError({ code: 'appeal not found' });
        }
        return appeal;
    }
    async update(id, updateAppealDto, modifyId) {
        const appeal = await this.prisma.appeal.findFirst({
            where: {
                id: id
            }
        });
        const appealUpdate = await this.prisma.appeal.update({
            where: {
                id,
            },
            data: {
                name: updateAppealDto.name ?? appeal.name,
                phone: updateAppealDto.phone ?? appeal.phone,
                subject: updateAppealDto.subject ?? appeal.subject,
                detail: updateAppealDto.detail ?? appeal.detail,
                state: updateAppealDto.state ?? appeal.state,
                modifyId: modifyId
            }
        });
        return appealUpdate;
    }
    async remove(id) {
        const appeal = await this.prisma.appeal.findFirst({
            where: {
                id,
            },
        });
        if (!appeal) {
            throw new http_error_1.HttpError({ code: 'appeal not found' });
        }
        return this.prisma.appeal.delete({
            where: {
                id,
            },
        });
    }
};
exports.AppealService = AppealService;
exports.AppealService = AppealService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AppealService);
//# sourceMappingURL=appeal.service.js.map