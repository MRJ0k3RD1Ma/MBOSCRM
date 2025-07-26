import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { SettingsModule } from './modules/settings/settings.module';
import { UserRoleModule } from './modules/userRole/userRole.module';
import { ClientModule } from './modules/client/client.module';
import { ProductGroupModule } from './modules/product-group/product-group.module';
import { ClientTypeModule } from './modules/clientType/clientType.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    UserModule,
    SettingsModule,
    PrismaModule,
    ClientTypeModule,
    ClientModule,
    ProductGroupModule,
    UserRoleModule,
    SettingsModule,
    PrismaModule,
  ],
})
export class AppModule {}
