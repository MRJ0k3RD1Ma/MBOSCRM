"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleProductController = void 0;
const common_1 = require("@nestjs/common");
const sale_product_service_1 = require("./sale-product.service");
const create_sale_product_dto_1 = require("./dto/create-sale-product.dto");
const update_sale_product_dto_1 = require("./dto/update-sale-product.dto");
const decorator_auth_1 = require("../../common/auth/decorator.auth");
const role_enum_1 = require("../../common/auth/roles/role.enum");
const findAll_sale_product_query_dto_1 = require("./dto/findAll-sale-product-query.dto");
let SaleProductController = class SaleProductController {
    constructor(saleProductService) {
        this.saleProductService = saleProductService;
    }
    create(createSaleProductDto, req) {
        const creatorId = req.user.id;
        return this.saleProductService.create(createSaleProductDto, creatorId);
    }
    findAll(dto) {
        return this.saleProductService.findAll(dto);
    }
    findOne(id) {
        return this.saleProductService.findOne(+id);
    }
    update(id, updateSaleProductDto, req) {
        const modifyId = req.user.id;
        return this.saleProductService.update(+id, updateSaleProductDto, modifyId);
    }
    remove(id, req) {
        const modifyId = req.user.id;
        return this.saleProductService.remove(+id, modifyId);
    }
};
exports.SaleProductController = SaleProductController;
__decorate([
    (0, common_1.Post)(),
    (0, decorator_auth_1.DecoratorWrapper)('create SaleProduct', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sale_product_dto_1.CreateSaleProductDto, Object]),
    __metadata("design:returntype", void 0)
], SaleProductController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorator_auth_1.DecoratorWrapper)('findAll SaleProduct', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findAll_sale_product_query_dto_1.FindAllSaleProductQueryDto]),
    __metadata("design:returntype", void 0)
], SaleProductController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('findOne SaleProduct', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SaleProductController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('update SaleProduct', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_sale_product_dto_1.UpdateSaleProductDto, Object]),
    __metadata("design:returntype", void 0)
], SaleProductController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('remove SaleProduct', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SaleProductController.prototype, "remove", null);
exports.SaleProductController = SaleProductController = __decorate([
    (0, common_1.Controller)('sale-product'),
    __metadata("design:paramtypes", [sale_product_service_1.SaleProductService])
], SaleProductController);
//# sourceMappingURL=sale-product.controller.js.map