import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { SaleProductModule } from '../sale-product/sale-product.module';
import { SubscribeModule } from '../subscribe/subscribe.module';

@Module({
  controllers: [SaleController],
  providers: [SaleService],
  imports: [SaleProductModule, SubscribeModule],
})
export class SaleModule {}
