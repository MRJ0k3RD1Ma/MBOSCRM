import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { SettingsModule } from './modules/settings/settings.module';

@Module({
  controllers: [],
  providers: [],
  imports: [UserModule, SettingsModule, PrismaModule],
})
export class AppModule {}
