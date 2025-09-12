import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class PaymeAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
