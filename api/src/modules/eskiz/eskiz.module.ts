import { Global, Module } from '@nestjs/common';
import { EskizService } from './eskiz.service';
import { EskizController } from './eskiz.controller';

@Global()
@Module({
  controllers: [EskizController],
  providers: [EskizService],
  exports: [EskizService],
})
export class EskizModule {}
