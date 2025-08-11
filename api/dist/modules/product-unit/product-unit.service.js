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
exports.ProductUnitService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const http_error_1 = require("../../common/exception/http.error");
const config_1 = require("../../common/config");
let ProductUnitService = class ProductUnitService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async onModuleInit() {
        if (config_1.env.ENV != 'prod') {
            const count = await this.prisma.productUnit.count();
            const requiredCount = 1;
            if (count < requiredCount) {
                for (let i = count; i < requiredCount; i++) {
                    await this.create({ name: 'dona' });
                }
            }
        }
    }
    async create(dto) {
        const exists = await this.prisma.productUnit.findFirst({
            where: {
                name: dto.name,
                isDeleted: false,
            },
        });
        if (exists) {
            throw new http_error_1.HttpError({
                message: `Product unit "${dto.name}" already exists`,
            });
        }
        return this.prisma.productUnit.create({
            data: {
                name: dto.name,
            },
        });
    }
    async findAll(dto) {
        const { limit = 10, page = 1, name } = dto;
        const [data, total] = await this.prisma.$transaction([
            this.prisma.productUnit.findMany({
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
            this.prisma.productUnit.count({
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
        const unit = await this.prisma.productUnit.findFirst({
            where: {
                id,
                isDeleted: false,
            },
        });
        if (!unit) {
            throw new http_error_1.HttpError({ message: `Product unit with ID ${id} not found` });
        }
        return unit;
    }
    async update(id, updateProductUnitDto) {
        const unit = await this.prisma.productUnit.findFirst({
            where: {
                id,
                isDeleted: false,
            },
        });
        if (!unit) {
            throw new http_error_1.HttpError({ message: `Product unit with ID ${id} not found` });
        }
        const update = await this.prisma.productUnit.update({
            where: { id },
            data: {
                name: updateProductUnitDto.name ?? unit.name,
            },
        });
        return update;
    }
    async remove(id) {
        const unit = await this.prisma.productUnit.findFirst({
            where: {
                id,
                isDeleted: false,
            },
        });
        if (!unit) {
            throw new http_error_1.HttpError({ message: `Product unit with ID ${id} not found` });
        }
        return this.prisma.productUnit.update({
            where: { id },
            data: {
                isDeleted: true,
            },
        });
    }
};
exports.ProductUnitService = ProductUnitService;
exports.ProductUnitService = ProductUnitService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductUnitService);
//# sourceMappingURL=product-unit.service.js.map