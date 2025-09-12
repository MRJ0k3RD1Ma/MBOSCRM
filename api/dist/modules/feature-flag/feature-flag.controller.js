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
exports.FeatureFlagController = void 0;
const common_1 = require("@nestjs/common");
const feature_flag_service_1 = require("./feature-flag.service");
let FeatureFlagController = class FeatureFlagController {
    constructor(featureFlagService) {
        this.featureFlagService = featureFlagService;
    }
};
exports.FeatureFlagController = FeatureFlagController;
exports.FeatureFlagController = FeatureFlagController = __decorate([
    (0, common_1.Controller)("feature-flag"),
    __metadata("design:paramtypes", [feature_flag_service_1.FeatureFlagService])
], FeatureFlagController);
//# sourceMappingURL=feature-flag.controller.js.map