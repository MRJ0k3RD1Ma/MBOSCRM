"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = errorHandler;
const base_error_1 = __importDefault(require("../errors/base.error"));
function errorHandler(err, req, res, next) {
    if (err.isTransactionError) {
        return res.json({
            error: {
                code: err.transactionErrorCode,
                message: err.transactionErrorMessage,
                data: err.transactionData,
            },
            id: err.transactionId,
        });
    }
    if (err instanceof base_error_1.default) {
        return res.status(err.status).json({
            message: err.message,
            errors: err.errors,
        });
    }
    return res.status(500).json({ message: err.message });
}
//# sourceMappingURL=error.middlware.js.map