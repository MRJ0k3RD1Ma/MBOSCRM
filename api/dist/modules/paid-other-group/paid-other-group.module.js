"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaidOtherGroupModule = void 0;
const common_1 = require("@nestjs/common");
const paid_other_group_service_1 = require("./paid-other-group.service");
const paid_other_group_controller_1 = require("./paid-other-group.controller");
let PaidOtherGroupModule = class PaidOtherGroupModule {
};
exports.PaidOtherGroupModule = PaidOtherGroupModule;
exports.PaidOtherGroupModule = PaidOtherGroupModule = __decorate([
    (0, common_1.Module)({
        controllers: [paid_other_group_controller_1.PaidOtherGroupController],
        providers: [paid_other_group_service_1.PaidOtherGroupService],
        exports: [paid_other_group_service_1.PaidOtherGroupService],
    })
], PaidOtherGroupModule);
//# sourceMappingURL=paid-other-group.module.js.map