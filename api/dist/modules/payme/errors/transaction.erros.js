"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_error_1 = __importDefault(require("./base.error"));
class TransactionError extends base_error_1.default {
    constructor(transactionError, id, data) {
        super(400, typeof transactionError.message === 'string' ? transactionError.message : JSON.stringify(transactionError.message), [], transactionError.name);
        this.transactionErrorCode = transactionError.code;
        this.transactionErrorMessage = transactionError.message;
        this.transactionData = data;
        this.transactionId = id;
        this.isTransactionError = true;
        Object.setPrototypeOf(this, TransactionError.prototype);
    }
}
exports.default = TransactionError;
//# sourceMappingURL=transaction.erros.js.map