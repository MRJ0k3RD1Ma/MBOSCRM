import { Module } from '@nestjs/common';
import { ClientCrmService } from './client-crm.service';
import { ClientCrmController } from './client-crm.controller';

@Module({
  controllers: [ClientCrmController],
  providers: [ClientCrmService],
  exports: [ClientCrmService],
})
export class ClientCrmModule {}
