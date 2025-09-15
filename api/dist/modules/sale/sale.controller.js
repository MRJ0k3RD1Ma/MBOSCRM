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
exports.SaleController = void 0;
const common_1 = require("@nestjs/common");
const sale_service_1 = require("./sale.service");
const create_sale_dto_1 = require("./dto/create-sale.dto");
const update_sale_dto_1 = require("./dto/update-sale.dto");
const decorator_auth_1 = require("../../common/auth/decorator.auth");
const role_enum_1 = require("../../common/auth/roles/role.enum");
const findAll_sale_query_dto_1 = require("./dto/findAll-sale-query.dto");
let SaleController = class SaleController {
    constructor(saleService) {
        this.saleService = saleService;
    }
    create(createSaleDto, req) {
        const creatorId = req.user.id;
        return this.saleService.create(createSaleDto, creatorId);
    }
    findAll(dto) {
        return this.saleService.findAll(dto);
    }
    findOne(id) {
        return this.saleService.findOne(+id);
    }
    update(id, updateSaleDto) {
        return this.saleService.update(+id, updateSaleDto);
    }
    remove(id) {
        return this.saleService.remove(+id);
    }
};
exports.SaleController = SaleController;
__decorate([
    (0, common_1.Post)(),
    (0, decorator_auth_1.DecoratorWrapper)('create Sale', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sale_dto_1.CreateSaleDto, Object]),
    __metadata("design:returntype", void 0)
], SaleController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorator_auth_1.DecoratorWrapper)('find Sale', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findAll_sale_query_dto_1.FindAllSaleQueryDto]),
    __metadata("design:returntype", void 0)
], SaleController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('find Sale', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SaleController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('update Sale', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_sale_dto_1.UpdateSaleDto]),
    __metadata("design:returntype", void 0)
], SaleController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('delete Sale', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SaleController.prototype, "remove", null);
exports.SaleController = SaleController = __decorate([
    (0, common_1.Controller)('sale'),
    __metadata("design:paramtypes", [sale_service_1.SaleService])
], SaleController);
//# sourceMappingURL=sale.controller.js.map