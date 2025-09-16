import { Module } from '@nestjs/common';
import { PaidCrmService } from './paid-crm.service';
import { PaidCrmController } from './paid-crm.controller';

@Module({
  controllers: [PaidCrmController],
  providers: [PaidCrmService],
})
export class PaidCrmModule {}
