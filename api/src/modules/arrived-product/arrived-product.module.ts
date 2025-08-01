import { Module } from '@nestjs/common';
import { ArrivedProductService } from './arrived-product.service';
import { ArrivedProductController } from './arrived-product.controller';

@Module({
  controllers: [ArrivedProductController],
  providers: [ArrivedProductService],
  exports: [ArrivedProductService],
})
export class ArrivedProductModule {}
