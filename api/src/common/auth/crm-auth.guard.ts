import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { decrypt } from '../utils/hash/hashing.utils';

export class CrmAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      let apiKey = request.headers['x-api-key'];

      if (!apiKey) {
        return true;
      }

      const crm_key: any = decrypt(apiKey);
      if (!crm_key) return true;

      request.crm = {
        key: crm_key,
      };
      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
