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
exports.ServerController = void 0;
const common_1 = require("@nestjs/common");
const server_service_1 = require("./server.service");
const create_server_dto_1 = require("./dto/create-server.dto");
const update_server_dto_1 = require("./dto/update-server.dto");
const findAll_query_server_dto_1 = require("./dto/findAll-query-server.dto");
const decorator_auth_1 = require("../../common/auth/decorator.auth");
const role_enum_1 = require("../../common/auth/roles/role.enum");
let ServerController = class ServerController {
    constructor(serverService) {
        this.serverService = serverService;
    }
    create(createServerDto, req) {
        const modifyId = req.user.id;
        return this.serverService.create(createServerDto, modifyId);
    }
    findAll(dto) {
        return this.serverService.findAll(dto);
    }
    findOne(id) {
        return this.serverService.findOne(+id);
    }
    update(id, updateServerDto, req) {
        const modifyId = req.user.id;
        return this.serverService.update(+id, updateServerDto, modifyId);
    }
    remove(id) {
        return this.serverService.remove(+id);
    }
};
exports.ServerController = ServerController;
__decorate([
    (0, common_1.Post)(),
    (0, decorator_auth_1.DecoratorWrapper)('createServer', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_server_dto_1.CreateServerDto, Object]),
    __metadata("design:returntype", void 0)
], ServerController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorator_auth_1.DecoratorWrapper)('findAllServer', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findAll_query_server_dto_1.FindAllQueryServer]),
    __metadata("design:returntype", void 0)
], ServerController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('findOneServer', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ServerController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('updateServer', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_server_dto_1.UpdateServerDto, Object]),
    __metadata("design:returntype", void 0)
], ServerController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('removeServer', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ServerController.prototype, "remove", null);
exports.ServerController = ServerController = __decorate([
    (0, common_1.Controller)('server'),
    __metadata("design:paramtypes", [server_service_1.ServerService])
], ServerController);
//# sourceMappingURL=server.controller.js.map