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
exports.SimCardService = void 0;
const common_1 = require("@nestjs/common");
const http_error_1 = require("src/common/exception/http.error");
const prisma_service_1 = require("../prisma/prisma.service");
let SimCardService = class SimCardService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createSimCardDto) {
        const client = await this.prisma.client.findFirst({
            where: { id: createSimCardDto.clientId, isDeleted: false },
        });
        if (!client) {
            throw (0, http_error_1.HttpError)({ code: "Client Not Found" });
        }
        const simCard = await this.prisma.simCard.create({
            data: {
                clientId: client.id,
                company: createSimCardDto.company,
                phoneNumber: createSimCardDto.phoneNumber,
                description: createSimCardDto.description,
                activeDate: createSimCardDto.activeDate,
                isActive: createSimCardDto.isActive,
            },
        });
        return simCard;
    }
    async findAll(dto) {
        const { limit = 10, page = 1, clientId, company, description, isActive, phoneNumber, } = dto;
        const where = {
            isDeleted: false,
        };
        if (company?.trim()) {
            where.company = { contains: company.trim(), mode: "insensitive" };
        }
        if (description?.trim()) {
            where.description = { contains: description.trim(), mode: "insensitive" };
        }
        if (phoneNumber?.trim()) {
            where.phoneNumber = { contains: phoneNumber.trim(), mode: "insensitive" };
        }
        if (isActive !== undefined) {
            where.isActive = isActive;
        }
        if (clientId) {
            where.clientId = clientId;
        }
        const [data, total] = await this.prisma.$transaction([
            this.prisma.simCard.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { id: "desc" },
                include: {
                    client: true,
                },
            }),
            this.prisma.simCard.count({ where }),
        ]);
        return {
            total,
            page,
            limit,
            data,
        };
    }
    async findOne(id) {
        const simCard = await this.prisma.simCard.findFirst({
            where: { id, isDeleted: false },
            include: { client: true },
        });
        if (!simCard) {
            throw (0, http_error_1.HttpError)({ code: "Sim Card not found" });
        }
        return simCard;
    }
    async update(id, dto) {
        const simCard = await this.prisma.simCard.findFirst({
            where: { id, isDeleted: false },
        });
        if (!simCard)
            throw (0, http_error_1.HttpError)({ code: "Sim Card not found" });
        const updateData = {
            activeDate: dto.activeDate ?? simCard.activeDate,
            company: dto.company ?? simCard.company,
            description: dto.description ?? simCard.description,
            phoneNumber: dto.phoneNumber ?? simCard.phoneNumber,
            isActive: dto.isActive ?? simCard.isActive,
        };
        const updatedSimCard = await this.prisma.simCard.update({
            where: { id },
            data: updateData,
        });
        return updatedSimCard;
    }
    async remove(id) {
        const simCard = await this.prisma.simCard.findFirst({
            where: { id: id, isDeleted: false },
        });
        if (!simCard) {
            throw (0, http_error_1.HttpError)({ code: "Sim Card not found" });
        }
        return await this.prisma.simCard.update({
            where: { id: id },
            data: { isDeleted: true },
        });
    }
};
exports.SimCardService = SimCardService;
exports.SimCardService = SimCardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SimCardService);
//# sourceMappingURL=sim-card.service.js.map