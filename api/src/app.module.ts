import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { SettingsModule } from './modules/settings/settings.module';
import { ClientModule } from './modules/client/client.module';
import { ProductGroupModule } from './modules/product-group/product-group.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    UserModule,
    SettingsModule,
    PrismaModule,
    ClientModule,
    ProductGroupModule,
  ],
})
export class AppModule {}
