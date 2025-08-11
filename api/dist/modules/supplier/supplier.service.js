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
exports.SupplierService = void 0;
const common_1 = require("@nestjs/common");
const http_error_1 = require("../../common/exception/http.error");
const prisma_service_1 = require("../prisma/prisma.service");
const config_1 = require("../../common/config");
const faker_1 = require("@faker-js/faker");
let SupplierService = class SupplierService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async onModuleInit() {
        if (config_1.env.ENV != 'prod') {
            const count = await this.prisma.supplier.count();
            const requiredCount = 5;
            if (count < requiredCount) {
                for (let i = count; i < requiredCount; i++) {
                    await this.create({
                        description: 'supplier description',
                        name: faker_1.faker.person.fullName(),
                        phone: faker_1.faker.phone.number(),
                    }, 1);
                }
            }
        }
    }
    async create(createSupplierDto, creatorId) {
        if (!creatorId) {
            throw (0, http_error_1.HttpError)({ code: 'Creator not found' });
        }
        if (createSupplierDto.phone) {
            const existingPhone = await this.prisma.supplier.findFirst({
                where: { phone: createSupplierDto.phone, isDeleted: false },
            });
            if (existingPhone) {
                throw (0, http_error_1.HttpError)({ code: 'Phone already exists' });
            }
        }
        const supplier = await this.prisma.supplier.create({
            data: {
                name: createSupplierDto.name,
                balance: 0,
                description: createSupplierDto.description,
                phone: createSupplierDto.phone,
                phoneTwo: createSupplierDto.phoneTwo,
                modifyId: creatorId,
                registerId: creatorId,
            },
        });
        return supplier;
    }
    async findAll(dto) {
        const { limit = 10, page = 1, name, description, phone, isPositiveBalance, } = dto;
        const where = {
            isDeleted: false,
        };
        if (name?.trim()) {
            where.name = { contains: name.trim() };
        }
        if (description?.trim()) {
            where.description = { contains: description.trim() };
        }
        if (isPositiveBalance !== undefined) {
            where.balance = isPositiveBalance ? { gt: 0 } : { lt: 0 };
        }
        if (phone?.trim()) {
            where.OR = [
                { phone: { contains: phone.trim() } },
                { phoneTwo: { contains: phone.trim() } },
            ];
        }
        const [data, total] = await this.prisma.$transaction([
            this.prisma.supplier.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: { register: true, modify: true },
            }),
            this.prisma.supplier.count({
                where,
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
        const supplier = await this.prisma.supplier.findFirst({
            where: { id, isDeleted: false },
            include: { register: true, modify: true },
        });
        if (!supplier) {
            throw (0, http_error_1.HttpError)({ code: 'Supplier not found' });
        }
        return supplier;
    }
    async update(id, dto, creatorId) {
        const supplier = await this.prisma.supplier.findFirst({
            where: { id, isDeleted: false },
        });
        if (!supplier)
            throw (0, http_error_1.HttpError)({ code: 'Supplier not found' });
        const updateData = {
            name: dto.name ?? supplier.name,
            description: dto.description ?? supplier.description,
            phone: dto.phone ?? supplier.phone,
            phoneTwo: dto.phoneTwo ?? supplier.phoneTwo,
            modifyId: creatorId,
        };
        const updatedSupplier = await this.prisma.supplier.update({
            where: { id },
            data: updateData,
        });
        return updatedSupplier;
    }
    async remove(id) {
        const supplier = await this.prisma.supplier.findFirst({
            where: { id: id },
        });
        if (!supplier) {
            throw (0, http_error_1.HttpError)({ code: 'Supplier not found' });
        }
        return await this.prisma.supplier.update({
            where: { id: id },
            data: { isDeleted: true },
        });
    }
};
exports.SupplierService = SupplierService;
exports.SupplierService = SupplierService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SupplierService);
//# sourceMappingURL=supplier.service.js.map