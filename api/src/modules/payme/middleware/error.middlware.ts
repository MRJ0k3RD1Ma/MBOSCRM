import { Request, Response, NextFunction } from 'express';
import BaseError from '../errors/base.error';
export default function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
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

  if (err instanceof BaseError) {
    return res.status(err.status).json({
      message: err.message,
      errors: err.errors,
    });
  }

  return res.status(500).json({ message: err.message });
}
