"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureFlagGuard = void 0;
const feature_flag_decorator_1 = require("./feature-flag.decorator");
class FeatureFlagGuard {
    constructor(reflector, featureFlagService) {
        this.reflector = reflector;
        this.featureFlagService = featureFlagService;
    }
    canActivate(context) {
        const featureFlag = this.reflector.get(feature_flag_decorator_1.FEATURE_FLAG_KEY, context.getHandler());
        return this.featureFlagService.isActive(featureFlag);
    }
}
exports.FeatureFlagGuard = FeatureFlagGuard;
//# sourceMappingURL=feature-flag.middleware.js.map