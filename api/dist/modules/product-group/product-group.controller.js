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
exports.ProductGroupController = void 0;
const common_1 = require("@nestjs/common");
const product_group_service_1 = require("./product-group.service");
const create_product_group_dto_1 = require("./dto/create-product-group.dto");
const update_product_group_dto_1 = require("./dto/update-product-group.dto");
const findAll_product_group_dto_1 = require("./dto/findAll-product-group.dto,");
const decorator_auth_1 = require("../../common/auth/decorator.auth");
const swagger_1 = require("@nestjs/swagger");
const role_enum_1 = require("../../common/auth/roles/role.enum");
let ProductGroupController = class ProductGroupController {
    constructor(productGroupService) {
        this.productGroupService = productGroupService;
    }
    create(createProductGroupDto, req) {
        const creatorId = req.user.id;
        return this.productGroupService.create(createProductGroupDto, creatorId);
    }
    findAll(dto) {
        return this.productGroupService.findAll(dto);
    }
    findOne(id) {
        return this.productGroupService.findOne(+id);
    }
    update(id, updateProductGroupDto, req) {
        const userId = req.user.id;
        return this.productGroupService.update(+id, updateProductGroupDto, userId);
    }
    async remove(id, req) {
        const userId = req.user.id;
        return this.productGroupService.remove(+id, userId);
    }
};
exports.ProductGroupController = ProductGroupController;
__decorate([
    (0, common_1.Post)(),
    (0, decorator_auth_1.DecoratorWrapper)('Create product group', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_group_dto_1.CreateProductGroupDto, Object]),
    __metadata("design:returntype", void 0)
], ProductGroupController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorator_auth_1.DecoratorWrapper)('Get all product groups'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findAll_product_group_dto_1.FindAllProductGroupQueryDto]),
    __metadata("design:returntype", void 0)
], ProductGroupController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('Get product group by id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductGroupController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('Update product group', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_group_dto_1.UpdateProductGroupDto, Object]),
    __metadata("design:returntype", void 0)
], ProductGroupController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('Delete product group', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductGroupController.prototype, "remove", null);
exports.ProductGroupController = ProductGroupController = __decorate([
    (0, common_1.Controller)('product-group'),
    (0, swagger_1.ApiTags)('Product Group'),
    __metadata("design:paramtypes", [product_group_service_1.ProductGroupService])
], ProductGroupController);
//# sourceMappingURL=product-group.controller.js.map