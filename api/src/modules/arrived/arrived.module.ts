import { Module } from '@nestjs/common';
import { ArrivedService } from './arrived.service';
import { ArrivedController } from './arrived.controller';

@Module({
  controllers: [ArrivedController],
  providers: [ArrivedService],
})
export class ArrivedModule {}
