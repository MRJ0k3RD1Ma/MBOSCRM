"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimCardModule = void 0;
const common_1 = require("@nestjs/common");
const sim_card_controller_1 = require("./sim-card.controller");
const sim_card_service_1 = require("./sim-card.service");
let SimCardModule = class SimCardModule {
};
exports.SimCardModule = SimCardModule;
exports.SimCardModule = SimCardModule = __decorate([
    (0, common_1.Module)({
        controllers: [sim_card_controller_1.SimCardController],
        providers: [sim_card_service_1.SimCardService],
        exports: [sim_card_service_1.SimCardService],
    })
], SimCardModule);
//# sourceMappingURL=sim-card.module.js.map