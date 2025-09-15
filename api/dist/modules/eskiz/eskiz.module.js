"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EskizModule = void 0;
const common_1 = require("@nestjs/common");
const eskiz_service_1 = require("./eskiz.service");
const eskiz_controller_1 = require("./eskiz.controller");
let EskizModule = class EskizModule {
};
exports.EskizModule = EskizModule;
exports.EskizModule = EskizModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        controllers: [eskiz_controller_1.EskizController],
        providers: [eskiz_service_1.EskizService],
        exports: [eskiz_service_1.EskizService],
    })
], EskizModule);
//# sourceMappingURL=eskiz.module.js.map