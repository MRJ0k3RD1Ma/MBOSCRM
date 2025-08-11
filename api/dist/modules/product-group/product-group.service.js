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
exports.ProductGroupService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const http_error_1 = require("../../common/exception/http.error");
const config_1 = require("../../common/config");
let ProductGroupService = class ProductGroupService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async onModuleInit() {
        if (config_1.env.ENV != 'prod') {
            const count = await this.prisma.productGroup.count();
            const requiredCount = 1;
            if (count < requiredCount) {
                for (let i = count; i < requiredCount; i++) {
                    await this.create({ name: 'product type' }, 1);
                }
            }
        }
    }
    async create(createProductGroupDto, creatorId) {
        const creator = await this.prisma.user.findUnique({
            where: {
                id: creatorId,
            },
        });
        if (!creator) {
            throw new http_error_1.HttpError({ code: 'Creator not found' });
        }
        const productGroup = await this.prisma.productGroup.create({
            data: {
                name: createProductGroupDto.name,
                registerId: creatorId,
                modifyId: creatorId,
            },
        });
        return productGroup;
    }
    async findAll(dto) {
        const { limit = 10, page = 1, name } = dto;
        const [data, total] = await this.prisma.$transaction([
            this.prisma.productGroup.findMany({
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
            this.prisma.productGroup.count({
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
        const productGroup = await this.prisma.productGroup.findFirst({
            where: {
                id,
                isDeleted: false,
            },
        });
        if (!productGroup) {
            throw new http_error_1.HttpError({ code: 'ProductGroup not found' });
        }
        return productGroup;
    }
    async update(id, updateProductGroupDto, userId) {
        const user = await this.prisma.user.findFirst({
            where: { id: userId, isDeleted: false },
        });
        if (!user) {
            throw (0, http_error_1.HttpError)({ message: `User with ID ${userId} not found` });
        }
        const existingGroup = await this.prisma.productGroup.findFirst({
            where: { id, isDeleted: false },
        });
        if (!existingGroup) {
            throw new http_error_1.HttpError({ message: `Product group with ID ${id} not found` });
        }
        return this.prisma.productGroup.update({
            where: { id },
            data: {
                name: updateProductGroupDto.name ?? existingGroup.name,
                modifyId: userId,
            },
        });
    }
    async remove(id, modifierId) {
        return this.prisma.productGroup.update({
            where: { id },
            data: {
                isDeleted: true,
                modifyId: modifierId,
            },
        });
    }
};
exports.ProductGroupService = ProductGroupService;
exports.ProductGroupService = ProductGroupService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductGroupService);
//# sourceMappingURL=product-group.service.js.map