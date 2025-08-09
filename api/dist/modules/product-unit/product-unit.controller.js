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
exports.ProductUnitController = void 0;
const common_1 = require("@nestjs/common");
const product_unit_service_1 = require("./product-unit.service");
const create_product_unit_dto_1 = require("./dto/create-product-unit.dto");
const update_product_unit_dto_1 = require("./dto/update-product-unit.dto");
const findAll_product_unit_query_dto_1 = require("./dto/findAll-product-unit-query.dto");
const role_enum_1 = require("../../common/auth/roles/role.enum");
const decorator_auth_1 = require("../../common/auth/decorator.auth");
let ProductUnitController = class ProductUnitController {
    constructor(productUnitService) {
        this.productUnitService = productUnitService;
    }
    create(createProductUnitDto) {
        return this.productUnitService.create(createProductUnitDto);
    }
    findAll(dto) {
        return this.productUnitService.findAll(dto);
    }
    findOne(id) {
        return this.productUnitService.findOne(+id);
    }
    update(id, updateProductUnitDto) {
        return this.productUnitService.update(+id, updateProductUnitDto);
    }
    remove(id) {
        return this.productUnitService.remove(+id);
    }
};
exports.ProductUnitController = ProductUnitController;
__decorate([
    (0, common_1.Post)(),
    (0, decorator_auth_1.DecoratorWrapper)('Create product unit', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_unit_dto_1.CreateProductUnitDto]),
    __metadata("design:returntype", void 0)
], ProductUnitController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorator_auth_1.DecoratorWrapper)('Get all product units'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findAll_product_unit_query_dto_1.FindAllProductUnitQueryDto]),
    __metadata("design:returntype", void 0)
], ProductUnitController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('Get product unit by id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductUnitController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('Update product unit', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_unit_dto_1.UpdateProductUnitDto]),
    __metadata("design:returntype", void 0)
], ProductUnitController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('Delete product unit', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductUnitController.prototype, "remove", null);
exports.ProductUnitController = ProductUnitController = __decorate([
    (0, common_1.Controller)('product-unit'),
    __metadata("design:paramtypes", [product_unit_service_1.ProductUnitService])
], ProductUnitController);
//# sourceMappingURL=product-unit.controller.js.map