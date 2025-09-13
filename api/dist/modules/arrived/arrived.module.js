"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrivedModule = void 0;
const common_1 = require("@nestjs/common");
const arrived_service_1 = require("./arrived.service");
const arrived_controller_1 = require("./arrived.controller");
const arrived_product_module_1 = require("../arrived-product/arrived-product.module");
let ArrivedModule = class ArrivedModule {
};
exports.ArrivedModule = ArrivedModule;
exports.ArrivedModule = ArrivedModule = __decorate([
    (0, common_1.Module)({
        controllers: [arrived_controller_1.ArrivedController],
        providers: [arrived_service_1.ArrivedService],
        imports: [arrived_product_module_1.ArrivedProductModule],
    })
], ArrivedModule);
//# sourceMappingURL=arrived.module.js.map