import { Module } from '@nestjs/common';
import { ArrivedService } from './arrived.service';
import { ArrivedController } from './arrived.controller';
import { ArrivedProductModule } from '../arrived-product/arrived-product.module';

@Module({
  controllers: [ArrivedController],
  providers: [ArrivedService],
  imports: [ArrivedProductModule],
})
export class ArrivedModule {}
