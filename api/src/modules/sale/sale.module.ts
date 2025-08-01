import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { SaleProductModule } from '../sale-product/sale-product.module';

@Module({
  controllers: [SaleController],
  providers: [SaleService],
  imports: [SaleProductModule],
})
export class SaleModule {}
