import { Module } from '@nestjs/common';
import { ClientTypeService } from './clientType.service';
import { ClientTypeController } from './clientType.controller';

@Module({
  controllers: [ClientTypeController],
  providers: [ClientTypeService],
  exports: [ClientTypeService],
})
export class ClientTypeModule {}
