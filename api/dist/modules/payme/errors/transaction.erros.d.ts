import BaseError from './base.error';
export interface PaymeErrorMessage {
    uz: string;
    ru: string;
    en: string;
}
export interface TransactionErrorType {
    code: number;
    message: string | PaymeErrorMessage;
    name: string;
}
export default class TransactionError extends BaseError {
    transactionErrorCode: number;
    transactionErrorMessage: string | PaymeErrorMessage;
    transactionData: any;
    transactionId: string | number;
    isTransactionError: boolean;
    constructor(transactionError: TransactionErrorType, id: string | number, data?: any);
}
