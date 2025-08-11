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
exports.PaidOtherController = void 0;
const common_1 = require("@nestjs/common");
const paid_other_service_1 = require("./paid-other.service");
const create_paid_other_dto_1 = require("./dto/create-paid-other.dto");
const update_paid_other_dto_1 = require("./dto/update-paid-other.dto");
const findAll_query_paid_other_dto_1 = require("./dto/findAll-query-paid-other.dto");
const decorator_auth_1 = require("../../common/auth/decorator.auth");
const role_enum_1 = require("../../common/auth/roles/role.enum");
let PaidOtherController = class PaidOtherController {
    constructor(paidOtherService) {
        this.paidOtherService = paidOtherService;
    }
    create(createPaidOtherDto) {
        return this.paidOtherService.create(createPaidOtherDto);
    }
    findAll(dto) {
        return this.paidOtherService.findAll(dto);
    }
    findOne(id) {
        return this.paidOtherService.findOne(+id);
    }
    update(id, updatePaidOtherDto) {
        return this.paidOtherService.update(+id, updatePaidOtherDto);
    }
    remove(id) {
        return this.paidOtherService.remove(+id);
    }
};
exports.PaidOtherController = PaidOtherController;
__decorate([
    (0, common_1.Post)(),
    (0, decorator_auth_1.DecoratorWrapper)('create PaidOther', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_paid_other_dto_1.CreatePaidOtherDto]),
    __metadata("design:returntype", void 0)
], PaidOtherController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorator_auth_1.DecoratorWrapper)('find all PaidOthers', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findAll_query_paid_other_dto_1.FindAllQueryPaidOtherDto]),
    __metadata("design:returntype", void 0)
], PaidOtherController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('find PaidOther by ID', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PaidOtherController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('update PaidOther', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_paid_other_dto_1.UpdatePaidOtherDto]),
    __metadata("design:returntype", void 0)
], PaidOtherController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('delete PaidOther', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PaidOtherController.prototype, "remove", null);
exports.PaidOtherController = PaidOtherController = __decorate([
    (0, common_1.Controller)('paid-other'),
    __metadata("design:paramtypes", [paid_other_service_1.PaidOtherService])
], PaidOtherController);
//# sourceMappingURL=paid-other.controller.js.map