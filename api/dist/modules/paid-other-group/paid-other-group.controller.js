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
exports.PaidOtherGroupController = void 0;
const common_1 = require("@nestjs/common");
const decorator_auth_1 = require("../../common/auth/decorator.auth");
const role_enum_1 = require("../../common/auth/roles/role.enum");
const paid_other_group_service_1 = require("./paid-other-group.service");
const create_paid_other_group_dto_1 = require("./dto/create-paid-other-group.dto");
const findAll_paid_other_group_dto_1 = require("./dto/findAll-paid-other-group.dto");
const update_paid_other_group_dto_1 = require("./dto/update-paid-other-group.dto");
let PaidOtherGroupController = class PaidOtherGroupController {
    constructor(paidOtherGroupService) {
        this.paidOtherGroupService = paidOtherGroupService;
    }
    create(createPaidOtherGroupDto) {
        return this.paidOtherGroupService.create(createPaidOtherGroupDto);
    }
    findAll(query) {
        return this.paidOtherGroupService.findAll(query);
    }
    findOne(id) {
        return this.paidOtherGroupService.findOne(+id);
    }
    update(id, updatePaidOtherGroupDto) {
        return this.paidOtherGroupService.update(+id, updatePaidOtherGroupDto);
    }
    remove(id) {
        return this.paidOtherGroupService.remove(+id);
    }
};
exports.PaidOtherGroupController = PaidOtherGroupController;
__decorate([
    (0, common_1.Post)(),
    (0, decorator_auth_1.DecoratorWrapper)('Create PaidOtherGroup', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_paid_other_group_dto_1.CreatePaidOtherGroupDto]),
    __metadata("design:returntype", void 0)
], PaidOtherGroupController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorator_auth_1.DecoratorWrapper)('Get All PaidOtherGroups', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findAll_paid_other_group_dto_1.FindAllPaidOtherGroupQueryDto]),
    __metadata("design:returntype", void 0)
], PaidOtherGroupController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('Get PaidOtherGroup by ID', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PaidOtherGroupController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('Update PaidOtherGroup', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_paid_other_group_dto_1.UpdatePaidOtherGroupDto]),
    __metadata("design:returntype", void 0)
], PaidOtherGroupController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('Delete PaidOtherGroup', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PaidOtherGroupController.prototype, "remove", null);
exports.PaidOtherGroupController = PaidOtherGroupController = __decorate([
    (0, common_1.Controller)('paid-other/group'),
    __metadata("design:paramtypes", [paid_other_group_service_1.PaidOtherGroupService])
], PaidOtherGroupController);
//# sourceMappingURL=paid-other-group.controller.js.map