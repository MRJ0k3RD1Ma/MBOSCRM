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
exports.SupplierController = void 0;
const common_1 = require("@nestjs/common");
const supplier_service_1 = require("./supplier.service");
const findAll_supplier_dto_1 = require("./dto/findAll-supplier.dto");
const decorator_auth_1 = require("../../common/auth/decorator.auth");
const role_enum_1 = require("../../common/auth/roles/role.enum");
const create_supplier_dto_1 = require("./dto/create-supplier.dto");
const update_supplier_dto_1 = require("./dto/update-supplier.dto");
let SupplierController = class SupplierController {
    constructor(supplierService) {
        this.supplierService = supplierService;
    }
    create(createSupplierDto, req) {
        const creatorId = req.user.id;
        return this.supplierService.create(createSupplierDto, creatorId);
    }
    findAll(query) {
        return this.supplierService.findAll(query);
    }
    findOne(id) {
        return this.supplierService.findOne(+id);
    }
    update(id, updateSupplierDto, req) {
        const creatorId = req.user.id;
        return this.supplierService.update(+id, updateSupplierDto, creatorId);
    }
    remove(id) {
        return this.supplierService.remove(+id);
    }
};
exports.SupplierController = SupplierController;
__decorate([
    (0, common_1.Post)(),
    (0, decorator_auth_1.DecoratorWrapper)('create Supplier', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_supplier_dto_1.CreateSupplierDto, Object]),
    __metadata("design:returntype", void 0)
], SupplierController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorator_auth_1.DecoratorWrapper)('Get All Suppliers', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findAll_supplier_dto_1.FindAllSupplierQueryDto]),
    __metadata("design:returntype", void 0)
], SupplierController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('Get Supplier by ID', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SupplierController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('Update Supplier', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_supplier_dto_1.UpdateSupplierDto, Object]),
    __metadata("design:returntype", void 0)
], SupplierController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('Delete Supplier', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SupplierController.prototype, "remove", null);
exports.SupplierController = SupplierController = __decorate([
    (0, common_1.Controller)('supplier'),
    __metadata("design:paramtypes", [supplier_service_1.SupplierService])
], SupplierController);
//# sourceMappingURL=supplier.controller.js.map