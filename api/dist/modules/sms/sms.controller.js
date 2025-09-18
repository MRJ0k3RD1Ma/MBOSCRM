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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsController = void 0;
const common_1 = require("@nestjs/common");
const feature_flag_decorator_1 = require("../feature-flag/feature-flag.decorator");
const sms_service_1 = require("./sms.service");
const crm_auth_guard_1 = require("../../common/auth/crm-auth.guard");
const send_message_dto_1 = require("./dtos/send-message.dto");
const config_1 = require("../../common/config");
const decorator_auth_1 = require("../../common/auth/decorator.auth");
const findAll_sms_query_dto_1 = require("./dtos/findAll-sms-query.dto");
let SmsController = class SmsController {
    constructor(smsService) {
        this.smsService = smsService;
    }
    sendMessage(body, req) {
        const key = req.crm?.key || config_1.env.MAIN_KEY;
        return this.smsService.sendMessage(body.mobile_phone, body.message, key);
    }
    findAll(dto, req) {
        const key = req.crm?.key;
        return this.smsService.getMessages(dto, key);
    }
};
exports.SmsController = SmsController;
__decorate([
    (0, common_1.Post)('send'),
    (0, decorator_auth_1.DecoratorWrapper)('send Sms'),
    (0, common_1.UseGuards)(crm_auth_guard_1.CrmAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_message_dto_1.SendMessageDto, Object]),
    __metadata("design:returntype", void 0)
], SmsController.prototype, "sendMessage", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorator_auth_1.DecoratorWrapper)('find Sms'),
    (0, common_1.UseGuards)(crm_auth_guard_1.CrmAuthGuard),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findAll_sms_query_dto_1.FindAllSmsQueryDto, Object]),
    __metadata("design:returntype", void 0)
], SmsController.prototype, "findAll", null);
exports.SmsController = SmsController = __decorate([
    (0, common_1.Controller)('sms'),
    (0, feature_flag_decorator_1.FeatureFlag)('sms'),
    __metadata("design:paramtypes", [sms_service_1.SmsService])
], SmsController);
//# sourceMappingURL=sms.controller.js.map