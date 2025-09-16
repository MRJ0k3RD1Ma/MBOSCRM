"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaidCrmModule = void 0;
const common_1 = require("@nestjs/common");
const paid_crm_service_1 = require("./paid-crm.service");
const paid_crm_controller_1 = require("./paid-crm.controller");
let PaidCrmModule = class PaidCrmModule {
};
exports.PaidCrmModule = PaidCrmModule;
exports.PaidCrmModule = PaidCrmModule = __decorate([
    (0, common_1.Module)({
        controllers: [paid_crm_controller_1.PaidCrmController],
        providers: [paid_crm_service_1.PaidCrmService],
    })
], PaidCrmModule);
//# sourceMappingURL=paid-crm.module.js.map