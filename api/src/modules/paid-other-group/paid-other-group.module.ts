import { Module } from '@nestjs/common';
import { PaidOtherGroupService } from './paid-other-group.service';
import { PaidOtherGroupController } from './paid-other-group.controller';

@Module({
  controllers: [PaidOtherGroupController],
  providers: [PaidOtherGroupService],
  exports: [PaidOtherGroupService],
})
export class PaidOtherGroupModule {}
