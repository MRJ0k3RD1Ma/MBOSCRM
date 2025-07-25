import { Module } from '@nestjs/common';
import { UserRoleService } from './userRole.service';
import { UserRoleController } from './userRole.controller';

@Module({
  controllers: [UserRoleController],
  providers: [UserRoleService],
  exports: [UserRoleService],
})
export class UserRoleModule {}
