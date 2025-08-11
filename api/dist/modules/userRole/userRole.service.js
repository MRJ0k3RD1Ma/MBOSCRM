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
exports.UserRoleService = void 0;
const common_1 = require("@nestjs/common");
const http_error_1 = require("../../common/exception/http.error");
const prisma_service_1 = require("../prisma/prisma.service");
let UserRoleService = class UserRoleService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async onModuleInit() {
        const count = await this.prisma.userRole.count();
        if (count == 0) {
            await this.create({
                name: 'superadmin',
            });
            await this.create({
                name: 'admin',
            });
        }
    }
    async create(createUserRoleDto) {
        const userRole = await this.prisma.userRole.create({
            data: createUserRoleDto,
        });
        return userRole;
    }
    async findAll(dto) {
        const { limit = 10, page = 1, name } = dto;
        const [data, total] = await this.prisma.$transaction([
            this.prisma.userRole.findMany({
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
            this.prisma.userRole.count({
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
        const userRole = await this.prisma.userRole.findUnique({
            where: { id, isDeleted: false },
        });
        if (!userRole) {
            throw (0, http_error_1.HttpError)({ code: 'UserRole not found' });
        }
        return userRole;
    }
    async update(id, dto) {
        const userRole = await this.prisma.userRole.findUnique({
            where: { id, isDeleted: false },
        });
        if (!userRole)
            throw (0, http_error_1.HttpError)({ code: 'UserRole not found' });
        const updateData = {
            name: dto.name || userRole.name,
        };
        const updatedUserRole = await this.prisma.userRole.update({
            where: { id },
            data: updateData,
        });
        return updatedUserRole;
    }
    async remove(id) {
        const userRole = await this.prisma.userRole.findUnique({
            where: { id: id, isDeleted: false },
        });
        if (!userRole) {
            throw (0, http_error_1.HttpError)({ code: 'UserRole not found' });
        }
        return await this.prisma.userRole.update({
            where: { id: id },
            data: { isDeleted: true },
        });
    }
};
exports.UserRoleService = UserRoleService;
exports.UserRoleService = UserRoleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserRoleService);
//# sourceMappingURL=userRole.service.js.map