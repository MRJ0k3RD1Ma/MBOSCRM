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
exports.ClientCrmController = void 0;
const common_1 = require("@nestjs/common");
const decorator_auth_1 = require("src/common/auth/decorator.auth");
const role_enum_1 = require("src/common/auth/roles/role.enum");
const client_crm_service_1 = require("./client-crm.service");
const create_client_crm_dto_1 = require("./dto/create-client-crm.dto");
const findAll_client_crm_dto_1 = require("./dto/findAll-client-crm.dto");
const update_client_crm_dto_1 = require("./dto/update-client-crm.dto");
let ClientCrmController = class ClientCrmController {
    constructor(clientCrmService) {
        this.clientCrmService = clientCrmService;
    }
    create(createClientCrmDto) {
        return this.clientCrmService.create(createClientCrmDto);
    }
    findAll(query) {
        return this.clientCrmService.findAll(query);
    }
    findOne(id) {
        return this.clientCrmService.findOne(+id);
    }
    update(id, updateClientCrmDto) {
        return this.clientCrmService.update(+id, updateClientCrmDto);
    }
    remove(id) {
        return this.clientCrmService.remove(+id);
    }
};
exports.ClientCrmController = ClientCrmController;
__decorate([
    (0, common_1.Post)(),
    (0, decorator_auth_1.DecoratorWrapper)('create Client Crm', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_client_crm_dto_1.CreateClientCrmDto]),
    __metadata("design:returntype", void 0)
], ClientCrmController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorator_auth_1.DecoratorWrapper)('Get All Client Crms', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findAll_client_crm_dto_1.FindAllClientCrmQueryDto]),
    __metadata("design:returntype", void 0)
], ClientCrmController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('Get Client Crm by ID', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClientCrmController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('Update Client Crm', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_client_crm_dto_1.UpdateClientCrmDto]),
    __metadata("design:returntype", void 0)
], ClientCrmController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('Delete Client Crm', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClientCrmController.prototype, "remove", null);
exports.ClientCrmController = ClientCrmController = __decorate([
    (0, common_1.Controller)('client-crm'),
    __metadata("design:paramtypes", [client_crm_service_1.ClientCrmService])
], ClientCrmController);
//# sourceMappingURL=client-crm.controller.js.map