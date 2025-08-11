"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientTypeModule = void 0;
const common_1 = require("@nestjs/common");
const clientType_service_1 = require("./clientType.service");
const clientType_controller_1 = require("./clientType.controller");
let ClientTypeModule = class ClientTypeModule {
};
exports.ClientTypeModule = ClientTypeModule;
exports.ClientTypeModule = ClientTypeModule = __decorate([
    (0, common_1.Module)({
        controllers: [clientType_controller_1.ClientTypeController],
        providers: [clientType_service_1.ClientTypeService],
        exports: [clientType_service_1.ClientTypeService],
    })
], ClientTypeModule);
//# sourceMappingURL=clientType.module.js.map