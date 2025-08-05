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
import { SaleModule } from './modules/sale/sale.module';
import { PaidClientModule } from './modules/paid-client/paid-client.module';
import { SubscribeModule } from './modules/subscribe/subscribe.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  controllers: [],
  providers: [],
  imports: [
    LocationModule,
    UserRoleModule,
    UserModule,
    SettingsModule,
    PrismaModule,
    ClientTypeModule,
    ProductUnitModule,
    ClientModule,
    ProductGroupModule,
    SettingsModule,
    PrismaModule,
    ProductModule,
    SupplierModule,
    PaymentModule,
    PaidSupplierModule,
    ArrivedModule,
    SaleModule,
    SaleProductModule,
    SaleModule,
    SubscribeModule,
    ArrivedProductModule,
    PaidClientModule,
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
