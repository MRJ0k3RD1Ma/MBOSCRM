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
exports.ArrivedService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const http_error_1 = require("../../common/exception/http.error");
const arrived_product_service_1 = require("../arrived-product/arrived-product.service");
const config_1 = require("../../common/config");
let ArrivedService = class ArrivedService {
    constructor(prisma, arrivedProductService) {
        this.prisma = prisma;
        this.arrivedProductService = arrivedProductService;
    }
    async onModuleInit() {
        if (config_1.env.ENV != 'prod') {
            const count = await this.prisma.arrived.count();
            const requiredCount = 5;
            if (count < requiredCount) {
                for (let i = count; i < requiredCount; i++) {
                    await this.create({
                        supplierId: 1,
                        date: new Date(),
                        description: 'description asdfghj',
                        products: [{ count: 1, productId: 1 }],
                    }, 1);
                }
            }
        }
    }
    async create(createArrivedDto, creatorId) {
        const { date, waybillNumber, supplierId, description, products } = createArrivedDto;
        const existingSupplier = await this.prisma.supplier.findFirst({
            where: { id: supplierId, isDeleted: false },
        });
        if (!existingSupplier) {
            throw new http_error_1.HttpError({
                message: `Supplier with ID ${supplierId} not found`,
            });
        }
        const maxCode = await this.prisma.arrived.findFirst({
            where: {
                created: {
                    lt: new Date(new Date().getFullYear(), 11),
                    gt: new Date(new Date().getFullYear(), 0),
                },
            },
            orderBy: { codeId: 'desc' },
        });
        const codeId = (maxCode?.codeId || 0) + 1;
        let arrived = await this.prisma.arrived.create({
            data: {
                date,
                code: `${new Date().getFullYear() - 2000}-${codeId}`,
                codeId,
                waybillNumber,
                supplierId,
                description,
                registerId: creatorId,
                modifyId: creatorId,
            },
        });
        let totalPrice = 0;
        for (const product of products) {
            const arrivedProduct = await this.arrivedProductService.create({
                arrivedId: arrived.id,
                count: product.count,
                productId: product.productId,
            }, creatorId);
            totalPrice += arrivedProduct.priceCount;
        }
        arrived = await this.prisma.arrived.update({
            where: { id: arrived.id },
            data: { price: totalPrice },
            include: { ArrivedProduct: { include: { Product: true } } },
        });
        return arrived;
    }
    async findAll(dto) {
        const { limit = 10, page = 1, minPrice, maxPrice, fromDate, toDate, supplierId, code, } = dto;
        const where = {
            isDeleted: false,
        };
        if (supplierId) {
            where.supplierId = supplierId;
        }
        if (code) {
            where.code = {
                startsWith: code,
                mode: 'insensitive',
            };
        }
        if (minPrice || maxPrice) {
            where.price = {
                ...(minPrice && { gte: minPrice }),
                ...(maxPrice && { lte: maxPrice }),
            };
        }
        if (fromDate || toDate) {
            where.date = {
                ...(fromDate && { gte: fromDate }),
                ...(toDate && { lte: toDate }),
            };
        }
        const [data, total] = await this.prisma.$transaction([
            this.prisma.arrived.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                include: { ArrivedProduct: true, register: true, supplier: true },
                orderBy: {
                    date: 'desc',
                },
            }),
            this.prisma.arrived.count({ where }),
        ]);
        return {
            total,
            page,
            limit,
            data,
        };
    }
    async findOne(id) {
        const arrived = await this.prisma.arrived.findFirst({
            where: {
                id,
                isDeleted: false,
            },
            include: { ArrivedProduct: true, register: true, supplier: true },
        });
        if (!arrived) {
            throw new http_error_1.HttpError({
                message: `Arrived with ID ${id} not found`,
            });
        }
        return arrived;
    }
    async update(id, updateArrivedDto) {
        const arrived = await this.prisma.arrived.findFirst({
            where: {
                id,
                isDeleted: false,
            },
        });
        if (!arrived) {
            throw new http_error_1.HttpError({
                message: `Arrived with ID ${id} not found`,
            });
        }
        return this.prisma.arrived.update({
            where: { id },
            data: {
                date: updateArrivedDto.date ?? arrived.date,
                code: updateArrivedDto.code ?? arrived.code,
                codeId: updateArrivedDto.codeId ?? arrived.codeId,
                waybillNumber: updateArrivedDto.waybillNumber ?? arrived.waybillNumber,
                supplierId: updateArrivedDto.supplierId ?? arrived.supplierId,
                description: updateArrivedDto.description ?? arrived.description,
                price: updateArrivedDto.price ?? arrived.price,
            },
        });
    }
    async remove(id) {
        const arrived = await this.prisma.arrived.findFirst({
            where: {
                id,
                isDeleted: false,
            },
        });
        if (!arrived) {
            throw new http_error_1.HttpError({
                message: `Arrived with ID ${id} not found`,
            });
        }
        return this.prisma.arrived.update({
            where: { id },
            data: { isDeleted: true },
        });
    }
};
exports.ArrivedService = ArrivedService;
exports.ArrivedService = ArrivedService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        arrived_product_service_1.ArrivedProductService])
], ArrivedService);
//# sourceMappingURL=arrived.service.js.map