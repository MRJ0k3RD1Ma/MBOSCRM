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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const http_error_1 = require("../../common/exception/http.error");
const config_1 = require("../../common/config");
const faker_1 = require("@faker-js/faker");
const client_1 = require("@prisma/client");
const event_emitter_1 = require("@nestjs/event-emitter");
let ProductService = class ProductService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async recalculate(productId) {
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
            select: { reminderFirst: true, type: true },
        });
        const saleAgg = await this.prisma.saleProduct.aggregate({
            where: { productId, isDeleted: false },
            _sum: { count: true },
        });
        const countSale = saleAgg._sum.count || 0;
        if (product?.type !== client_1.ProductType.DEVICE) {
            await this.prisma.product.update({
                where: { id: productId },
                data: {
                    countSale,
                },
            });
            return;
        }
        const arrivedAgg = await this.prisma.arrivedProduct.aggregate({
            where: { productId, isDeleted: false },
            _sum: { count: true },
        });
        const countArrived = arrivedAgg._sum.count || 0;
        const reminderFirst = product?.reminderFirst || 0;
        const countReminder = reminderFirst + countArrived - countSale;
        await this.prisma.product.update({
            where: { id: productId },
            data: {
                countArrived,
                countSale,
                countReminder,
            },
        });
    }
    async onModuleInit() {
        (async () => {
            const products = await this.prisma.product.findMany({
                where: { isDeleted: false },
                select: { id: true },
            });
            for (const product of products) {
                await this.recalculate(product.id);
            }
        })();
        if (config_1.env.ENV != 'prod') {
            const count = await this.prisma.product.count();
            const requiredCount = 5;
            if (count < requiredCount) {
                for (let i = count; i < requiredCount; i++) {
                    await this.create({
                        groupId: 1,
                        name: faker_1.faker.commerce.productName(),
                        price: +faker_1.faker.commerce.price(),
                        priceIncome: +faker_1.faker.commerce.price(),
                        reminderFirst: 5,
                        type: client_1.ProductType.DEVICE,
                        unitId: 1,
                    }, 1);
                }
            }
        }
    }
    async create(createProductDto, creatorId) {
        const { name, barcode, groupId, unitId, priceIncome, reminderFirst, price, type, } = createProductDto;
        const existingGroup = await this.prisma.productGroup.findFirst({
            where: { id: groupId, isDeleted: false },
        });
        if (!creatorId) {
            throw (0, http_error_1.HttpError)({ message: 'Creator not found' });
        }
        if (!existingGroup) {
            throw (0, http_error_1.HttpError)({ message: 'Group not found' });
        }
        if (createProductDto.unitId) {
            const existingUnit = await this.prisma.productUnit.findFirst({
                where: { id: unitId, isDeleted: false },
            });
            if (!existingUnit) {
                throw (0, http_error_1.HttpError)({ message: 'ProductUnit not found' });
            }
        }
        let barcodeId = 0;
        if (!barcode) {
            const max = await this.prisma.product.findMany({
                where: { barcodeId: { not: null } },
                take: 1,
                orderBy: { barcodeId: 'desc' },
            });
            barcodeId = (max[0]?.barcodeId || 1_000_000) + 1;
            const product = await this.prisma.product.create({
                data: {
                    name,
                    barcodeId,
                    groupId,
                    unitId,
                    priceIncome,
                    reminderFirst,
                    price,
                    type,
                    countReminder: reminderFirst,
                    countArrived: 0,
                    countSale: 0,
                    registerId: creatorId,
                    modifyId: creatorId,
                },
            });
            return product;
        }
        const product = await this.prisma.product.create({
            data: {
                name,
                barcode,
                groupId,
                unitId,
                priceIncome,
                reminderFirst,
                price,
                type,
                countReminder: 0,
                countArrived: 0,
                countSale: 0,
                registerId: creatorId,
                modifyId: creatorId,
            },
        });
        return product;
    }
    async findAll(dto) {
        const { limit = 20, page = 1, name, type, barcode, groupId, unitId, minPrice, maxPrice, minCount, maxCount, } = dto;
        const where = {
            isDeleted: false,
            ...(name && {
                name: {
                    contains: name.trim(),
                    mode: client_1.Prisma.QueryMode.insensitive,
                },
            }),
            ...(type && { type }),
            ...(barcode && { barcode: { contains: barcode } }),
            ...(groupId && { groupId }),
            ...(unitId && { unitId }),
            ...(minPrice || maxPrice
                ? { priceIncome: { gte: minPrice, lte: maxPrice } }
                : {}),
            ...(minCount || maxCount
                ? { countArrived: { gte: minCount, lte: maxCount } }
                : {}),
        };
        const [data, total] = await this.prisma.$transaction([
            this.prisma.product.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { id: 'desc' },
            }),
            this.prisma.product.count({ where }),
        ]);
        return { total, page, limit, data };
    }
    async findOne(id) {
        let product = await this.prisma.product.findFirst({
            where: {
                id,
                isDeleted: false,
            },
        });
        if (!product) {
            throw new http_error_1.HttpError({ code: 'Product not found' });
        }
        await this.recalculate(product.id);
        product = await this.prisma.product.findFirst({
            where: {
                id,
                isDeleted: false,
            },
        });
        return product;
    }
    async update(id, dto) {
        const existingProduct = await this.prisma.product.findFirst({
            where: { id, isDeleted: false },
        });
        if (!existingProduct) {
            throw new http_error_1.HttpError({ message: `Product with ID ${id} not found` });
        }
        if (dto.groupId !== undefined) {
            const groupExists = await this.prisma.productGroup.findFirst({
                where: { id: dto.groupId, isDeleted: false },
            });
            if (!groupExists) {
                throw new http_error_1.HttpError({
                    message: `Group with ID ${dto.groupId} not found`,
                });
            }
        }
        if (dto.unitId !== undefined) {
            const unitExists = await this.prisma.productUnit.findFirst({
                where: { id: dto.unitId, isDeleted: false },
            });
            if (!unitExists) {
                throw new http_error_1.HttpError({
                    message: `Unit with ID ${dto.unitId} not found`,
                });
            }
        }
        if (dto.barcode !== undefined && dto.barcode !== existingProduct.barcode) {
            const existingWithBarcode = await this.prisma.product.findFirst({
                where: {
                    barcode: dto.barcode,
                    NOT: { id },
                },
            });
            if (existingWithBarcode) {
                throw new http_error_1.HttpError({
                    message: `Barcode "${dto.barcode}" is already used by another product`,
                });
            }
        }
        const updateData = {};
        const fields = [
            'name',
            'barcode',
            'groupId',
            'unitId',
            'priceIncome',
            'reminderFirst',
            'price',
            'type',
            'countReminder',
            'countArrived',
            'countSale',
        ];
        for (const field of fields) {
            if (dto[field] !== undefined) {
                updateData[field] = dto[field];
            }
        }
        const updated = await this.prisma.product.update({
            where: { id },
            data: updateData,
        });
        return updated;
    }
    async remove(id) {
        const product = await this.prisma.product.findFirst({
            where: { id, isDeleted: false },
        });
        if (!product) {
            throw new http_error_1.HttpError({ code: 'Product not found' });
        }
        return this.prisma.product.update({
            where: { id },
            data: {
                isDeleted: true,
            },
        });
    }
};
exports.ProductService = ProductService;
__decorate([
    (0, event_emitter_1.OnEvent)('recalculate.product'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductService.prototype, "recalculate", null);
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductService);
//# sourceMappingURL=product.service.js.map