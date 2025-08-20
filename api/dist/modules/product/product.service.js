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
let ProductService = class ProductService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async onModuleInit() {
        if (config_1.env.ENV != "prod") {
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
            throw (0, http_error_1.HttpError)({ message: "Creator not found" });
        }
        if (!existingGroup) {
            throw (0, http_error_1.HttpError)({ message: "Group not found" });
        }
        if (createProductDto.unitId) {
            const existingUnit = await this.prisma.productUnit.findFirst({
                where: { id: unitId, isDeleted: false },
            });
            if (!existingUnit) {
                throw (0, http_error_1.HttpError)({ message: "ProductUnit not found" });
            }
        }
        let barcodeId = 0;
        if (!barcode) {
            const max = await this.prisma.product.findMany({
                where: { barcodeId: { not: null } },
                take: 1,
                orderBy: { barcodeId: "desc" },
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
        const { limit = 10, page = 1, name, type, barcode, groupId, unitId, minPrice, maxPrice, minCount, maxCount, } = dto;
        const [data, total] = await this.prisma.$transaction([
            this.prisma.product.findMany({
                where: {
                    name: {
                        contains: name?.trim() || "",
                        mode: "insensitive",
                    },
                    type: { equals: type },
                    barcode: { contains: barcode },
                    groupId: { equals: groupId },
                    unitId: { equals: unitId },
                    priceIncome: { gte: minPrice, lte: maxPrice },
                    countArrived: { gte: minCount, lte: maxCount },
                    isDeleted: false,
                },
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: "desc" },
            }),
            this.prisma.product.count({
                where: {
                    name: {
                        contains: name?.trim() || "",
                        mode: "insensitive",
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
        const product = await this.prisma.product.findFirst({
            where: {
                id,
                isDeleted: false,
            },
        });
        if (!product) {
            throw new http_error_1.HttpError({ code: "Product not found" });
        }
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
            "name",
            "barcode",
            "groupId",
            "unitId",
            "priceIncome",
            "reminderFirst",
            "price",
            "type",
            "countReminder",
            "countArrived",
            "countSale",
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
            throw new http_error_1.HttpError({ code: "Product not found" });
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
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductService);
//# sourceMappingURL=product.service.js.map