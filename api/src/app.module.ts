import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { SettingsModule } from './modules/settings/settings.module';
import { UserRoleModule } from './modules/userRole/userRole.module';
import { ClientModule } from './modules/client/client.module';
import { ProductGroupModule } from './modules/product-group/product-group.module';
import { ClientTypeModule } from './modules/clientType/clientType.module';
import { ProductModule } from './modules/product/product.module';
import { ProductUnitModule } from './modules/product-unit/product-unit.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    UserModule,
    SettingsModule,
    PrismaModule,
    ClientModule,
    ProductGroupModule,
    UserRoleModule,
    SettingsModule,
    PrismaModule,
    ClientModule,
    ClientTypeModule,
    ProductModule,
    ProductUnitModule,
  ],
})
export class AppModule {}
