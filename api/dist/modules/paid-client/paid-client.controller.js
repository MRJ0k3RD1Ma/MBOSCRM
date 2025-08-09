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
exports.PaidClientController = void 0;
const common_1 = require("@nestjs/common");
const paid_client_service_1 = require("./paid-client.service");
const create_paid_client_dto_1 = require("./dto/create-paid-client.dto");
const update_paid_client_dto_1 = require("./dto/update-paid-client.dto");
const findAll_query_paid_client_dto_1 = require("./dto/findAll-query-paid-client.dto");
const decorator_auth_1 = require("../../common/auth/decorator.auth");
const role_enum_1 = require("../../common/auth/roles/role.enum");
let PaidClientController = class PaidClientController {
    constructor(paidClientService) {
        this.paidClientService = paidClientService;
    }
    create(createPaidClientDto, req) {
        return this.paidClientService.create(createPaidClientDto, req.user.id);
    }
    findAll(dto) {
        return this.paidClientService.findAll(dto);
    }
    findOne(id) {
        return this.paidClientService.findOne(+id);
    }
    update(id, updatePaidClientDto) {
        return this.paidClientService.update(+id, updatePaidClientDto);
    }
    remove(id) {
        return this.paidClientService.remove(+id);
    }
};
exports.PaidClientController = PaidClientController;
__decorate([
    (0, common_1.Post)(),
    (0, decorator_auth_1.DecoratorWrapper)('create PaidClient', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_paid_client_dto_1.CreatePaidClientDto, Object]),
    __metadata("design:returntype", void 0)
], PaidClientController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorator_auth_1.DecoratorWrapper)('find all PaidClients', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findAll_query_paid_client_dto_1.FindAllQueryPaidClientDto]),
    __metadata("design:returntype", void 0)
], PaidClientController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('find PaidClient by ID', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PaidClientController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('update PaidClient', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_paid_client_dto_1.UpdatePaidClientDto]),
    __metadata("design:returntype", void 0)
], PaidClientController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('delete PaidClient', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PaidClientController.prototype, "remove", null);
exports.PaidClientController = PaidClientController = __decorate([
    (0, common_1.Controller)('paid-client'),
    __metadata("design:paramtypes", [paid_client_service_1.PaidClientService])
], PaidClientController);
//# sourceMappingURL=paid-client.controller.js.map