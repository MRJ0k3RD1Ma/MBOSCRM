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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const config_1 = require("../../common/config");
const axios_1 = __importDefault(require("axios"));
const hashing_utils_1 = require("../../common/utils/hash/hashing.utils");
const schedule_1 = require("@nestjs/schedule");
const eskiz_service_1 = require("../eskiz/eskiz.service");
const feature_flag_service_1 = require("../feature-flag/feature-flag.service");
const http_error_1 = require("../../common/exception/http.error");
let SmsService = class SmsService {
    constructor(prisma, featureFlagService, eskizService) {
        this.prisma = prisma;
        this.featureFlagService = featureFlagService;
        this.eskizService = eskizService;
        this.axios = config_1.env.IS_MAIN
            ? undefined
            : axios_1.default.create({
                baseURL: config_1.env.MAIN_BACKEND_URL,
                headers: { 'x-api-key': (0, hashing_utils_1.encrypt)(config_1.env.MAIN_KEY) },
            });
    }
    async cron() {
        console.log('cron');
        if (!config_1.env.IS_MAIN)
            return;
        const messagesToSend = await this.prisma.detailization.findMany({
            where: { state: 'NEW' },
        });
        for (let message of messagesToSend) {
            await this.eskizService.sendMessage(message);
        }
        const messagesToCheck = await this.prisma.detailization.findMany({
            where: { state: 'WAITING', updatedAt: { lt: new Date(Date.now() - 1000 * 60 * 5) } },
        });
        for (let message of messagesToCheck) {
            const status = await this.eskizService.getSmsStatusByMessageId(message.messageId);
            await this.prisma.detailization.update({ where: { id: message.id }, data: { state: status } });
        }
    }
    async sendMessage(mobile_phone, message, crm_key) {
        if (config_1.env.IS_MAIN) {
            const clientCrm = await this.prisma.clientCrm.findFirst({
                where: { key: crm_key },
            });
            return await this.prisma.detailization.create({
                data: {
                    message,
                    phone_number: mobile_phone,
                    clientId: clientCrm?.clientId,
                    crmId: clientCrm?.id,
                },
            });
        }
        else if (this.featureFlagService.isActive('sms')) {
            const { data } = await this.axios.post('/sms/send', {
                mobile_phone,
                message,
            });
            return data;
        }
        else {
            throw new http_error_1.HttpError({
                statusCode: '403',
                message: 'Sms is not enabled',
                code: 'SMS_NOT_ENABLED',
            });
        }
    }
    async getMessages(dto, crm_key) {
        const { limit = 10, page = 1, message } = dto;
        if (config_1.env.IS_MAIN) {
            const where = {
                isDeleted: false,
            };
            if (message) {
                where.message = {
                    contains: message.trim(),
                    mode: 'insensitive',
                };
            }
            if (crm_key) {
                where.crm = { key: crm_key };
            }
            const [data, total] = await this.prisma.$transaction([
                this.prisma.detailization.findMany({
                    where,
                    skip: (page - 1) * limit,
                    take: limit,
                    include: {
                        client: true,
                        crm: true,
                    },
                    orderBy: {
                        id: 'desc',
                    },
                }),
                this.prisma.detailization.count({ where }),
            ]);
            return {
                total,
                page,
                limit,
                data,
            };
        }
        else if (this.featureFlagService.isActive('sms')) {
            const { data } = await this.axios.get('/sms/send', {
                params: { ...dto },
            });
            return data;
        }
        else {
            throw new http_error_1.HttpError({
                statusCode: '403',
                message: 'Sms is not enabled',
                code: 'SMS_NOT_ENABLED',
            });
        }
    }
};
exports.SmsService = SmsService;
__decorate([
    (0, schedule_1.Cron)('0 */30 * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SmsService.prototype, "cron", null);
exports.SmsService = SmsService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Optional)()),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        feature_flag_service_1.FeatureFlagService,
        eskiz_service_1.EskizService])
], SmsService);
//# sourceMappingURL=sms.service.js.map