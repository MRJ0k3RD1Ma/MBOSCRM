import { Module } from '@nestjs/common';
import { PaidOtherService } from './paid-other.service';
import { PaidOtherController } from './paid-other.controller';

@Module({
  controllers: [PaidOtherController],
  providers: [PaidOtherService],
})
export class PaidOtherModule {}
