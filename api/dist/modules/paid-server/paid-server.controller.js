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
exports.PaidServerController = void 0;
const common_1 = require("@nestjs/common");
const paid_server_service_1 = require("./paid-server.service");
const create_paid_server_dto_1 = require("./dto/create-paid-server.dto");
const update_paid_server_dto_1 = require("./dto/update-paid-server.dto");
const findAll_query_paid_server_dto_1 = require("./dto/findAll-query-paid-server.dto");
const decorator_auth_1 = require("../../common/auth/decorator.auth");
const role_enum_1 = require("../../common/auth/roles/role.enum");
let PaidServerController = class PaidServerController {
    constructor(paidServerService) {
        this.paidServerService = paidServerService;
    }
    create(createPaidServerDto) {
        return this.paidServerService.create(createPaidServerDto);
    }
    findAll(dto) {
        return this.paidServerService.findAll(dto);
    }
    findOne(id) {
        return this.paidServerService.findOne(+id);
    }
    update(id, updatePaidServerDto) {
        return this.paidServerService.update(+id, updatePaidServerDto);
    }
    remove(id) {
        return this.paidServerService.remove(+id);
    }
};
exports.PaidServerController = PaidServerController;
__decorate([
    (0, common_1.Post)(),
    (0, decorator_auth_1.DecoratorWrapper)('create PaidServer', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_paid_server_dto_1.CreatePaidServerDto]),
    __metadata("design:returntype", void 0)
], PaidServerController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorator_auth_1.DecoratorWrapper)('find all PaidServers', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findAll_query_paid_server_dto_1.FindAllQueryPaidServerDto]),
    __metadata("design:returntype", void 0)
], PaidServerController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('find PaidServer by ID', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PaidServerController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('update PaidServer', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_paid_server_dto_1.UpdatePaidServerDto]),
    __metadata("design:returntype", void 0)
], PaidServerController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('delete PaidServer', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PaidServerController.prototype, "remove", null);
exports.PaidServerController = PaidServerController = __decorate([
    (0, common_1.Controller)('paid-server'),
    __metadata("design:paramtypes", [paid_server_service_1.PaidServerService])
], PaidServerController);
//# sourceMappingURL=paid-server.controller.js.map