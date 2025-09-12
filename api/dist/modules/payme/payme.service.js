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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const mongoose_1 = require("mongoose");
const transaction_enum_1 = require("./enum/transaction.enum");
const transaction_erros_1 = __importDefault(require("./errors/transaction.erros"));
let PaymeService = class PaymeService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async checkPerformTransaction(params, id) {
        let { account, amount } = params;
        if (!mongoose_1.Types.ObjectId.isValid(account.user_id)) {
            throw new transaction_erros_1.default(transaction_enum_1.PaymeError.UserNotFound, id, transaction_enum_1.PaymeData.UserId);
        }
        if (!mongoose_1.Types.ObjectId.isValid(account.product_id)) {
            throw new transaction_erros_1.default(transaction_enum_1.PaymeError.ProductNotFound, id, transaction_enum_1.PaymeData.ProductId);
        }
        amount = Math.floor(amount / 100);
        const user = await this.prisma.user.findUnique({
            where: { id: account.user_id },
        });
        if (!user) {
            throw new transaction_erros_1.default(transaction_enum_1.PaymeError.UserNotFound, id, transaction_enum_1.PaymeData.UserId);
        }
    }
    findAll() {
        return `This action returns all payme`;
    }
    findOne(id) {
        return `This action returns a #${id} payme`;
    }
    update(id, updatePaymeDto) {
        return `This action updates a #${id} payme`;
    }
    remove(id) {
        return `This action removes a #${id} payme`;
    }
};
exports.PaymeService = PaymeService;
exports.PaymeService = PaymeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymeService);
//# sourceMappingURL=payme.service.js.map