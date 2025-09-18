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

  constructor(
    transactionError: TransactionErrorType,
    id: string | number,
    data?: any,
  ) {
    super(
      400,
      typeof transactionError.message === 'string'
        ? transactionError.message
        : JSON.stringify(transactionError.message),
      [],
      transactionError.name,
    );

    this.transactionErrorCode = transactionError.code;
    this.transactionErrorMessage = transactionError.message;
    this.transactionData = data;
    this.transactionId = id;
    this.isTransactionError = true;

    Object.setPrototypeOf(this, TransactionError.prototype);
  }
}
