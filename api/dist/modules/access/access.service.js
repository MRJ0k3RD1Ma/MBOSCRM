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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const http_error_1 = require("../../common/exception/http.error");
const config_1 = require("../../common/config");
const feature_flag_service_1 = require("../feature-flag/feature-flag.service");
const axios_1 = __importDefault(require("axios"));
const hashing_utils_1 = require("../../common/utils/hash/hashing.utils");
const schedule_1 = require("@nestjs/schedule");
let AccessService = class AccessService {
    constructor(prisma, featureFlagService) {
        this.prisma = prisma;
        this.featureFlagService = featureFlagService;
        this.axios = config_1.env.IS_MAIN
            ? undefined
            : axios_1.default.create({
                baseURL: config_1.env.MAIN_BACKEND_URL,
                headers: { "x-api-key": (0, hashing_utils_1.encrypt)(config_1.env.MAIN_KEY) },
            });
    }
    async cron() {
        const { data } = await this.axios.get("/access", {
            params: { limit: 1000 },
        });
        const accesses = data.data;
        for (let access of accesses) {
            await this.prisma.access.upsert({
                where: { key: access.key },
                create: {
                    key: access.key,
                    isActive: false,
                    name: access.name,
                    description: access.description,
                    price: access.price,
                },
                update: {
                    name: access.name,
                    description: access.description,
                    price: access.price,
                },
            });
        }
        this.featureFlagService.loadFlags();
    }
    async onModuleInit() {
        const keys = ["sms", "feedback"];
        if (config_1.env.IS_MAIN) {
            for (let key of keys) {
                await this.prisma.access.upsert({
                    where: { key },
                    create: {
                        key,
                        isActive: true,
                        name: key,
                        description: key,
                        price: 0,
                    },
                    update: {},
                });
            }
        }
        else {
            const { data } = await this.axios.get("/access", {
                params: { limit: 1000 },
            });
            const accesses = data.data;
            for (let access of accesses) {
                await this.prisma.access.upsert({
                    where: { key: access.key },
                    create: {
                        key: access.key,
                        isActive: false,
                        name: access.name,
                        description: access.description,
                        price: access.price,
                    },
                    update: {
                        name: access.name,
                        description: access.description,
                        price: access.price,
                    },
                });
            }
        }
        this.featureFlagService.loadFlags();
    }
    async findAll(dto) {
        const { limit = 10, page = 1 } = dto;
        const [data, total] = await this.prisma.$transaction([
            this.prisma.access.findMany({
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { id: "desc" },
            }),
            this.prisma.access.count({}),
        ]);
        return {
            total,
            page,
            limit,
            data,
        };
    }
    async findOne(id) {
        const access = await this.prisma.access.findFirst({
            where: {
                id,
            },
        });
        if (!access) {
            throw new http_error_1.HttpError({ code: "access not found" });
        }
        return access;
    }
    async update(id, dto) {
        const access = await this.prisma.access.findFirst({
            where: { id, isDeleted: false },
        });
        if (!access) {
            throw new http_error_1.HttpError({ message: `access with ID ${id} not found` });
        }
        const mainUpdateData = {
            description: dto.description,
            name: dto.name,
            price: dto.price,
        };
        const updateData = {
            ...(config_1.env.IS_MAIN ? mainUpdateData : {}),
            isActive: dto.isActive,
        };
        const updated = await this.prisma.access.update({
            where: { id },
            data: updateData,
        });
        return updated;
    }
};
exports.AccessService = AccessService;
__decorate([
    (0, schedule_1.Cron)("0 0 * * *"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AccessService.prototype, "cron", null);
exports.AccessService = AccessService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        feature_flag_service_1.FeatureFlagService])
], AccessService);
//# sourceMappingURL=access.service.js.map