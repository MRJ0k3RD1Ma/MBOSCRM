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
exports.EskizController = void 0;
const common_1 = require("@nestjs/common");
const eskiz_service_1 = require("./eskiz.service");
const feature_flag_decorator_1 = require("../feature-flag/feature-flag.decorator");
let EskizController = class EskizController {
    constructor(eskizService) {
        this.eskizService = eskizService;
    }
};
exports.EskizController = EskizController;
exports.EskizController = EskizController = __decorate([
    (0, common_1.Controller)("eskiz"),
    (0, feature_flag_decorator_1.FeatureFlag)("ESKIZ"),
    __metadata("design:paramtypes", [eskiz_service_1.EskizService])
], EskizController);
//# sourceMappingURL=eskiz.controller.js.map