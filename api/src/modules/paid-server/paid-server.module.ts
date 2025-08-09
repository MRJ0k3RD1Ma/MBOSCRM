import { Module } from '@nestjs/common';
import { PaidServerService } from './paid-server.service';
import { PaidServerController } from './paid-server.controller';

@Module({
  controllers: [PaidServerController],
  providers: [PaidServerService],
})
export class PaidServerModule {}
