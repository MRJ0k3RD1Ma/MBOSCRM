import { Module } from '@nestjs/common';
import { SaleProductService } from './sale-product.service';
import { SaleProductController } from './sale-product.controller';

@Module({
  controllers: [SaleProductController],
  providers: [SaleProductService],
  exports: [SaleProductService],
})
export class SaleProductModule {}
