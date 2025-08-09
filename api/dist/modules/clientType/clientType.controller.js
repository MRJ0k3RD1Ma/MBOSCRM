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
exports.ClientTypeController = void 0;
const common_1 = require("@nestjs/common");
const decorator_auth_1 = require("../../common/auth/decorator.auth");
const role_enum_1 = require("../../common/auth/roles/role.enum");
const clientType_service_1 = require("./clientType.service");
const create_client_type_dto_1 = require("./dto/create-client-type.dto");
const findAll_client_type_dto_1 = require("./dto/findAll-client-type.dto");
const update_client_type_dto_1 = require("./dto/update-client-type.dto");
let ClientTypeController = class ClientTypeController {
    constructor(clientTypeService) {
        this.clientTypeService = clientTypeService;
    }
    create(createClientTypeDto) {
        return this.clientTypeService.create(createClientTypeDto);
    }
    findAll(query) {
        return this.clientTypeService.findAll(query);
    }
    findOne(id) {
        return this.clientTypeService.findOne(+id);
    }
    update(id, updateClientTypeDto) {
        return this.clientTypeService.update(+id, updateClientTypeDto);
    }
    remove(id) {
        return this.clientTypeService.remove(+id);
    }
};
exports.ClientTypeController = ClientTypeController;
__decorate([
    (0, common_1.Post)(),
    (0, decorator_auth_1.DecoratorWrapper)('Create ClientType', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_client_type_dto_1.CreateClientTypeDto]),
    __metadata("design:returntype", void 0)
], ClientTypeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorator_auth_1.DecoratorWrapper)('Get All ClientTypes', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findAll_client_type_dto_1.FindAllClientTypeQueryDto]),
    __metadata("design:returntype", void 0)
], ClientTypeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('Get ClientType by ID', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClientTypeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('Update ClientType', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_client_type_dto_1.UpdateClientTypeDto]),
    __metadata("design:returntype", void 0)
], ClientTypeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('Delete ClientType', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClientTypeController.prototype, "remove", null);
exports.ClientTypeController = ClientTypeController = __decorate([
    (0, common_1.Controller)('client/type'),
    __metadata("design:paramtypes", [clientType_service_1.ClientTypeService])
], ClientTypeController);
//# sourceMappingURL=clientType.controller.js.map