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
exports.PaidSupplierController = void 0;
const common_1 = require("@nestjs/common");
const paid_supplier_service_1 = require("./paid-supplier.service");
const findAll_paid_supplier_dto_1 = require("./dto/findAll-paid-supplier.dto");
const decorator_auth_1 = require("../../common/auth/decorator.auth");
const role_enum_1 = require("../../common/auth/roles/role.enum");
const create_paid_supplier_dto_1 = require("./dto/create-paid-supplier.dto");
const update_paid_supplier_dto_1 = require("./dto/update-paid-supplier.dto");
let PaidSupplierController = class PaidSupplierController {
    constructor(paidsupplierService) {
        this.paidsupplierService = paidsupplierService;
    }
    create(createPaidSupplierDto, req) {
        const creatorId = req.user.id;
        return this.paidsupplierService.create(createPaidSupplierDto, creatorId);
    }
    findAll(query) {
        return this.paidsupplierService.findAll(query);
    }
    findOne(id) {
        return this.paidsupplierService.findOne(+id);
    }
    update(id, updatePaidSupplierDto) {
        return this.paidsupplierService.update(+id, updatePaidSupplierDto);
    }
    remove(id, req) {
        const modifierId = req.user.id;
        return this.paidsupplierService.remove(+id, modifierId);
    }
};
exports.PaidSupplierController = PaidSupplierController;
__decorate([
    (0, common_1.Post)(),
    (0, decorator_auth_1.DecoratorWrapper)('create PaidSupplier', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_paid_supplier_dto_1.CreatePaidSupplierDto, Object]),
    __metadata("design:returntype", void 0)
], PaidSupplierController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorator_auth_1.DecoratorWrapper)('Get All PaidSuppliers', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findAll_paid_supplier_dto_1.FindAllPaidSupplierQueryDto]),
    __metadata("design:returntype", void 0)
], PaidSupplierController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('Get PaidSupplier by ID', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PaidSupplierController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('Update PaidSupplier', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_paid_supplier_dto_1.UpdatePaidSupplierDto]),
    __metadata("design:returntype", void 0)
], PaidSupplierController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('Delete PaidSupplier', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PaidSupplierController.prototype, "remove", null);
exports.PaidSupplierController = PaidSupplierController = __decorate([
    (0, common_1.Controller)('paidsupplier'),
    __metadata("design:paramtypes", [paid_supplier_service_1.PaidSupplierService])
], PaidSupplierController);
//# sourceMappingURL=paid-supplier.controller.js.map