export default class BaseError extends Error {
  status: number;
  errors: any[];
  statusCode?: number;

  constructor(
    status: number,
    message: string,
    errors: any[] = [],
    name?: string,
    statusCode?: number,
  ) {
    super(message);
    this.status = status;
    this.errors = errors;
    this.name = name ?? 'BaseError';
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, BaseError.prototype);
  }

  static BadRequest(message: string, errors: any[] = []) {
    return new BaseError(400, message, errors, 'BadRequestError');
  }

  static Unauthorized() {
    return new BaseError(401, 'Unauthorized', [], 'UnauthorizedError');
  }
}
