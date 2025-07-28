import { Module } from '@nestjs/common';
import { PaidSupplierService } from './paid-supplier.service';
import { PaidSupplierController } from './paid-supplier.controller';

@Module({
  controllers: [PaidSupplierController],
  providers: [PaidSupplierService],
  exports: [PaidSupplierService],
})
export class PaidSupplierModule {}
