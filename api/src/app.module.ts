import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { SettingsModule } from './modules/settings/settings.module';
import { UserRoleModule } from './modules/userRole/userRole.module';
import { ClientModule } from './modules/client/client.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    UserModule,
    UserRoleModule,
    SettingsModule,
    PrismaModule,
    ClientModule,
  ],
})
export class AppModule {}
