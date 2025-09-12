"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureFlagMetadata = exports.FEATURE_FLAG_KEY = void 0;
exports.FeatureFlag = FeatureFlag;
const common_1 = require("@nestjs/common");
const feature_flag_middleware_1 = require("./feature-flag.middleware");
exports.FEATURE_FLAG_KEY = "FEATURE_FLAG";
const FeatureFlagMetadata = (key) => (0, common_1.SetMetadata)(exports.FEATURE_FLAG_KEY, key);
exports.FeatureFlagMetadata = FeatureFlagMetadata;
function FeatureFlag(key) {
    return (0, common_1.applyDecorators)((0, exports.FeatureFlagMetadata)(key), (0, common_1.UseGuards)(feature_flag_middleware_1.FeatureFlagGuard));
}
//# sourceMappingURL=feature-flag.decorator.js.map