export default class BaseError extends Error {
    status: number;
    errors: any[];
    statusCode?: number;
    constructor(status: number, message: string, errors?: any[], name?: string, statusCode?: number);
    static BadRequest(message: string, errors?: any[]): BaseError;
    static Unauthorized(): BaseError;
}
