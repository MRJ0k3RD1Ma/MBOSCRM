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
    constructor(prisma, eskizService, featureFlagService) {
        this.prisma = prisma;
        this.eskizService = eskizService;
        this.featureFlagService = featureFlagService;
        this.axios = config_1.env.IS_MAIN
            ? undefined
            : axios_1.default.create({
                baseURL: config_1.env.MAIN_BACKEND_URL,
                headers: { "x-api-key": (0, hashing_utils_1.encrypt)(config_1.env.MAIN_KEY) },
            });
    }
    async cron() {
        if (!config_1.env.IS_MAIN)
            return;
        const messagesToSend = await this.prisma.detailization.findMany({
            where: { state: "NEW" },
        });
        for (let message of messagesToSend) {
            await this.eskizService.sendMessage(message);
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
        else if (this.featureFlagService.isActive("sms")) {
            const { data } = await this.axios.post("/api/sms/send", {
                mobile_phone,
                message,
            });
            return data;
        }
        else {
            throw new http_error_1.HttpError({
                statusCode: "403",
                message: "Sms is not enabled",
                code: "SMS_NOT_ENABLED",
            });
        }
    }
};
exports.SmsService = SmsService;
__decorate([
    (0, schedule_1.Cron)("* * * * *"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SmsService.prototype, "cron", null);
exports.SmsService = SmsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        eskiz_service_1.EskizService,
        feature_flag_service_1.FeatureFlagService])
], SmsService);
//# sourceMappingURL=sms.service.js.map