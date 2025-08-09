import { Module } from '@nestjs/common';
import { SaleProductService } from './sale-product.service';
import { SaleProductController } from './sale-product.controller';
import { SubscribeModule } from '../subscribe/subscribe.module';

@Module({
  controllers: [SaleProductController],
  providers: [SaleProductService],
  exports: [SaleProductService],
  imports: [SubscribeModule],
})
export class SaleProductModule {}
