"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcryptjs"));
const prisma_service_1 = require("../prisma/prisma.service");
const http_error_1 = require("../../common/exception/http.error");
const jsonwebtoken_1 = require("jsonwebtoken");
const token_version_store_1 = require("../../common/auth/token-version.store");
const refresh_token_version_store_1 = require("../../common/auth/refresh-token-version.store");
const config_1 = require("../../common/config");
const role_enum_1 = require("../../common/auth/roles/role.enum");
const faker_1 = require("@faker-js/faker");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async onModuleInit() {
        if ((await this.prisma.user.count({})) == 0) {
            await this.create({
                name: 'admin',
                password: 'admin',
                username: 'admin',
                roleId: 1,
            });
        }
        if (config_1.env.ENV != 'prod') {
            const count = await this.prisma.userRole.count();
            const requiredCount = 1;
            if (count < requiredCount) {
                for (let i = count; i < requiredCount; i++) {
                    await this.create({
                        name: faker_1.faker.person.fullName(),
                        password: '1234',
                        username: faker_1.faker.person.firstName(),
                        roleId: 1,
                        phone: faker_1.faker.phone.number(),
                    });
                }
            }
        }
    }
    async create(createUserDto) {
        const existingUser = await this.prisma.user.findFirst({
            where: { name: createUserDto.name },
        });
        if (existingUser) {
            throw (0, http_error_1.HttpError)({ code: 'User with this name already exists' });
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        createUserDto.password = hashedPassword;
        const user = await this.prisma.user.create({
            data: {
                ...createUserDto,
            },
        });
        delete user.password;
        return user;
    }
    async login(dto) {
        const { username, password } = dto;
        const user = await this.prisma.user.findFirst({
            where: { username: username, isDeleted: false },
        });
        if (!user) {
            throw (0, http_error_1.HttpError)({ code: 'User not found' });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw (0, http_error_1.HttpError)({ code: 'Invalid credentials' });
        }
        (0, token_version_store_1.incrementTokenVersion)(user.id.toString());
        (0, refresh_token_version_store_1.incrementRefreshTokenVersion)(user.id.toString());
        const tokenVersion = (0, token_version_store_1.getTokenVersion)(user.id.toString());
        const refreshTokenVersion = (0, refresh_token_version_store_1.getRefreshTokenVersion)(user.id.toString());
        const [accessToken, refreshToken] = [
            (0, jsonwebtoken_1.sign)({ id: user.id, role: role_enum_1.Role.Admin, tokenVersion }, config_1.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '2h',
            }),
            (0, jsonwebtoken_1.sign)({ id: user.id, role: role_enum_1.Role.Admin, refreshTokenVersion }, config_1.env.REFRESH_TOKEN_SECRET, {
                expiresIn: '7d',
            }),
        ];
        delete user.password;
        return {
            user,
            accessToken,
            refreshToken,
        };
    }
    async refresh(dto) {
        const token = dto.refreshToken;
        const userData = (0, jsonwebtoken_1.verify)(token, config_1.env.REFRESH_TOKEN_SECRET);
        if (!userData)
            throw (0, http_error_1.HttpError)({ code: 'LOGIN_FAILED' });
        const user = await this.prisma.user.findUnique({
            where: { id: userData.id },
        });
        if (!user) {
            throw (0, http_error_1.HttpError)({ code: 'User not found' });
        }
        const currentRefreshVersion = (0, refresh_token_version_store_1.getRefreshTokenVersion)(user.id.toString());
        if (userData.refreshTokenVersion !== currentRefreshVersion) {
            throw (0, http_error_1.HttpError)({ code: 'TOKEN_INVALIDATED' });
        }
        (0, token_version_store_1.incrementTokenVersion)(user.id.toString());
        const currentTokenVersion = (0, token_version_store_1.getTokenVersion)(user.id.toString());
        const accessToken = (0, jsonwebtoken_1.sign)({
            id: user.id,
            tokenVersion: currentTokenVersion,
            role: role_enum_1.Role.Admin,
        }, config_1.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' });
        return { accessToken };
    }
    async logout(id) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw (0, http_error_1.HttpError)({ code: 'User not found' });
        }
        (0, token_version_store_1.incrementTokenVersion)(user.id.toString());
        (0, refresh_token_version_store_1.incrementRefreshTokenVersion)(user.id.toString());
        return { message: 'Logged out successfully' };
    }
    async findAll(dto) {
        const { limit = 10, page = 1, name } = dto;
        const [data, total] = await this.prisma.$transaction([
            this.prisma.user.findMany({
                where: {
                    name: {
                        contains: name?.trim() || '',
                        mode: 'insensitive',
                    },
                    isDeleted: false,
                },
                skip: (page - 1) * limit,
                take: limit,
                include: { UserRole: true },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.user.count({
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
        const user = await this.prisma.user.findUnique({
            where: { id, isDeleted: false },
            include: { UserRole: true },
        });
        if (!user) {
            throw (0, http_error_1.HttpError)({ code: 'User not found' });
        }
        return user;
    }
    async update(id, dto) {
        const user = await this.prisma.user.findUnique({
            where: { id, isDeleted: false },
        });
        if (!user)
            throw (0, http_error_1.HttpError)({ code: 'User not found' });
        const updateData = {
            name: dto.name || user.name,
            chatId: dto.chatId || user.chatId,
            phone: dto.phone || user.phone,
            roleId: dto.roleId || user.roleId,
            username: dto.username || user.username,
        };
        if (dto.password) {
            updateData.password = await bcrypt.hash(dto.password, 10);
        }
        let role;
        if (updateData.roleId) {
            role = await this.prisma.userRole.findUnique({
                where: { id: updateData.roleId },
            });
            if (!role) {
                throw (0, http_error_1.HttpError)({ code: 'Role Not Found' });
            }
            updateData.roleId = role.id;
        }
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: updateData,
        });
        return updatedUser;
    }
    async remove(id) {
        const user = await this.prisma.user.findUnique({
            where: { id: id, isDeleted: false },
        });
        if (!user) {
            throw (0, http_error_1.HttpError)({ code: 'User not found' });
        }
        return await this.prisma.user.update({
            where: { id: id },
            data: { isDeleted: true },
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map