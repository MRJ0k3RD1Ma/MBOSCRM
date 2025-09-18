"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrmAuthGuard = void 0;
const hashing_utils_1 = require("../utils/hash/hashing.utils");
class CrmAuthGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        try {
            const request = context.switchToHttp().getRequest();
            let apiKey = request.headers['x-api-key'];
            if (!apiKey) {
                return true;
            }
            const crm_key = (0, hashing_utils_1.decrypt)(apiKey);
            if (!crm_key)
                return true;
            request.crm = {
                key: crm_key,
            };
            return true;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
}
exports.CrmAuthGuard = CrmAuthGuard;
//# sourceMappingURL=crm-auth.guard.js.map