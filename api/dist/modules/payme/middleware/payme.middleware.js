"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymeAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const base_64_1 = __importDefault(require("base-64"));
const transaction_enum_js_1 = require("../enum/transaction.enum.js");
const transaction_erros_js_1 = __importDefault(require("../errors/transaction.erros.js"));
const PAYME_MERCHANT_KEY = process.env.PAYME_MERCHANT_KEY;
let PaymeAuthGuard = class PaymeAuthGuard {
    canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const { id } = req.body;
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (!token)
            throw new transaction_erros_js_1.default(transaction_enum_js_1.PaymeError.InvalidAuthorization, id);
        const data = base_64_1.default.decode(token);
        if (!data.includes(PAYME_MERCHANT_KEY)) {
            throw new transaction_erros_js_1.default(transaction_enum_js_1.PaymeError.InvalidAuthorization, id);
        }
        return true;
    }
};
exports.PaymeAuthGuard = PaymeAuthGuard;
exports.PaymeAuthGuard = PaymeAuthGuard = __decorate([
    (0, common_1.Injectable)()
], PaymeAuthGuard);
//# sourceMappingURL=payme.middleware.js.map