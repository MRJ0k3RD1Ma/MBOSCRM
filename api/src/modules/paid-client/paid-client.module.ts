import { Module } from '@nestjs/common';
import { PaidClientService } from './paid-client.service';
import { PaidClientController } from './paid-client.controller';

@Module({
  controllers: [PaidClientController],
  providers: [PaidClientService],
})
export class PaidClientModule {}
