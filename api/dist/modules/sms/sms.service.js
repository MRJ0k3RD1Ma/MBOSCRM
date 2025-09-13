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
exports.SmsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const config_1 = require("../../common/config");
let SmsService = class SmsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async onModuleInit() { }
    async sendMessage(mobile_phone, message, crm_key) {
        if (config_1.env.IS_MAIN) {
            if (!crm_key)
                throw new Error("crm_key is required");
            const clientCrm = await this.prisma.clientCrm.findFirst({
                where: { key: crm_key },
            });
            if (!clientCrm)
                throw new Error("crm_key is invalid");
            await this.prisma.detailization.create({
                data: {
                    message,
                    phone_number: mobile_phone,
                    clientId: clientCrm.clientId,
                    crmId: clientCrm.id,
                },
            });
        }
        else {
        }
    }
};
exports.SmsService = SmsService;
exports.SmsService = SmsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SmsService);
//# sourceMappingURL=sms.service.js.map