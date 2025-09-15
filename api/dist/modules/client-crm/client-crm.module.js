"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientCrmModule = void 0;
const common_1 = require("@nestjs/common");
const client_crm_service_1 = require("./client-crm.service");
const client_crm_controller_1 = require("./client-crm.controller");
let ClientCrmModule = class ClientCrmModule {
};
exports.ClientCrmModule = ClientCrmModule;
exports.ClientCrmModule = ClientCrmModule = __decorate([
    (0, common_1.Module)({
        controllers: [client_crm_controller_1.ClientCrmController],
        providers: [client_crm_service_1.ClientCrmService],
        exports: [client_crm_service_1.ClientCrmService],
    })
], ClientCrmModule);
//# sourceMappingURL=client-crm.module.js.map