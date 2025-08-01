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
import { LocationModule } from './modules/location/location.module';
import { SupplierModule } from './modules/supplier/supplier.module';
import { PaidSupplierModule } from './modules/paid-supplier/paid-supplier.module';
import { PaymentModule } from './modules/payment/payment.module';
import { ArrivedModule } from './modules/arrived/arrived.module';
import { SaleProductModule } from './modules/sale-product/sale-product.module';
import { ArrivedProductModule } from './modules/arrived-product/arrived-product.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    LocationModule,
    UserModule,
    SettingsModule,
    PrismaModule,
    ClientTypeModule,
    ClientModule,
    ProductGroupModule,
    UserRoleModule,
    SettingsModule,
    PrismaModule,
    ProductModule,
    ProductUnitModule,
    SupplierModule,
    PaidSupplierModule,
    PaymentModule,
    ArrivedModule,
    SaleProductModule,
    ArrivedProductModule,
  ],
})
export class AppModule {}
