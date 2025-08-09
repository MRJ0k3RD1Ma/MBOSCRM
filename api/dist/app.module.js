"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("./modules/prisma/prisma.module");
const user_module_1 = require("./modules/user/user.module");
const settings_module_1 = require("./modules/settings/settings.module");
const userRole_module_1 = require("./modules/userRole/userRole.module");
const client_module_1 = require("./modules/client/client.module");
const product_group_module_1 = require("./modules/product-group/product-group.module");
const clientType_module_1 = require("./modules/clientType/clientType.module");
const product_module_1 = require("./modules/product/product.module");
const product_unit_module_1 = require("./modules/product-unit/product-unit.module");
const location_module_1 = require("./modules/location/location.module");
const supplier_module_1 = require("./modules/supplier/supplier.module");
const paid_supplier_module_1 = require("./modules/paid-supplier/paid-supplier.module");
const payment_module_1 = require("./modules/payment/payment.module");
const arrived_module_1 = require("./modules/arrived/arrived.module");
const sale_product_module_1 = require("./modules/sale-product/sale-product.module");
const arrived_product_module_1 = require("./modules/arrived-product/arrived-product.module");
const sale_module_1 = require("./modules/sale/sale.module");
const paid_client_module_1 = require("./modules/paid-client/paid-client.module");
const subscribe_module_1 = require("./modules/subscribe/subscribe.module");
const schedule_1 = require("@nestjs/schedule");
const paid_other_group_module_1 = require("./modules/paid-other-group/paid-other-group.module");
const paid_other_module_1 = require("./modules/paid-other/paid-other.module");
const statistics_module_1 = require("./modules/statistics/statistics.module");
const paid_server_module_1 = require("./modules/paid-server/paid-server.module");
const server_module_1 = require("./modules/server/server.module");
const nestjs_1 = require("@grammyjs/nestjs");
const config_1 = require("./common/config");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        controllers: [],
        providers: [],
        imports: [
            location_module_1.LocationModule,
            userRole_module_1.UserRoleModule,
            user_module_1.UserModule,
            statistics_module_1.StatisticsModule,
            settings_module_1.SettingsModule,
            prisma_module_1.PrismaModule,
            clientType_module_1.ClientTypeModule,
            product_unit_module_1.ProductUnitModule,
            client_module_1.ClientModule,
            product_group_module_1.ProductGroupModule,
            settings_module_1.SettingsModule,
            prisma_module_1.PrismaModule,
            product_module_1.ProductModule,
            supplier_module_1.SupplierModule,
            payment_module_1.PaymentModule,
            paid_supplier_module_1.PaidSupplierModule,
            arrived_module_1.ArrivedModule,
            sale_module_1.SaleModule,
            sale_product_module_1.SaleProductModule,
            subscribe_module_1.SubscribeModule,
            arrived_product_module_1.ArrivedProductModule,
            paid_client_module_1.PaidClientModule,
            paid_other_group_module_1.PaidOtherGroupModule,
            paid_other_module_1.PaidOtherModule,
            paid_server_module_1.PaidServerModule,
            server_module_1.ServerModule,
            schedule_1.ScheduleModule.forRoot(),
            nestjs_1.NestjsGrammyModule.forRoot({ token: config_1.env.BOT_TOKEN }),
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map