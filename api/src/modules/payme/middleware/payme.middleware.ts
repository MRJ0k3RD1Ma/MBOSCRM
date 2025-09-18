import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import base64 from 'base-64';
import { PaymeError } from '../enum/transaction.enum.js';
import TransactionError from '../errors/transaction.erros.js';

const PAYME_MERCHANT_KEY = process.env.PAYME_MERCHANT_KEY;

@Injectable()
export class PaymeAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const { id } = req.body;
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) throw new TransactionError(PaymeError.InvalidAuthorization, id);

    const data = base64.decode(token);

    if (!data.includes(PAYME_MERCHANT_KEY)) {
      throw new TransactionError(PaymeError.InvalidAuthorization, id);
    }

    return true;
  }
}
