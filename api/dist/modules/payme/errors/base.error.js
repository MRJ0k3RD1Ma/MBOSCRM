"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseError extends Error {
    constructor(status, message, errors = [], name, statusCode) {
        super(message);
        this.status = status;
        this.errors = errors;
        this.name = name ?? 'BaseError';
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, BaseError.prototype);
    }
    static BadRequest(message, errors = []) {
        return new BaseError(400, message, errors, 'BadRequestError');
    }
    static Unauthorized() {
        return new BaseError(401, 'Unauthorized', [], 'UnauthorizedError');
    }
}
exports.default = BaseError;
//# sourceMappingURL=base.error.js.map