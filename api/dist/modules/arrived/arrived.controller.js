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
exports.ArrivedController = void 0;
const common_1 = require("@nestjs/common");
const arrived_service_1 = require("./arrived.service");
const create_arrived_dto_1 = require("./dto/create-arrived.dto");
const update_arrived_dto_1 = require("./dto/update-arrived.dto");
const decorator_auth_1 = require("../../common/auth/decorator.auth");
const role_enum_1 = require("../../common/auth/roles/role.enum");
const findAll_arrived_query_dto_1 = require("./dto/findAll-arrived-query.dto");
let ArrivedController = class ArrivedController {
    constructor(arrivedService) {
        this.arrivedService = arrivedService;
    }
    create(createArrivedDto, req) {
        const creatorId = req.user.id;
        return this.arrivedService.create(createArrivedDto, creatorId);
    }
    findAll(dto) {
        return this.arrivedService.findAll(dto);
    }
    findOne(id) {
        return this.arrivedService.findOne(+id);
    }
    update(id, updateArrivedDto, req) {
        return this.arrivedService.update(+id, updateArrivedDto, req.user.id);
    }
    remove(id) {
        return this.arrivedService.remove(+id);
    }
};
exports.ArrivedController = ArrivedController;
__decorate([
    (0, common_1.Post)(),
    (0, decorator_auth_1.DecoratorWrapper)('create Arrived', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_arrived_dto_1.CreateArrivedDto, Object]),
    __metadata("design:returntype", void 0)
], ArrivedController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorator_auth_1.DecoratorWrapper)('find Arrived', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findAll_arrived_query_dto_1.FindAllArrivedQueryDto]),
    __metadata("design:returntype", void 0)
], ArrivedController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('find Arrived', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ArrivedController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('update Arrived', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_arrived_dto_1.UpdateArrivedDto, Object]),
    __metadata("design:returntype", void 0)
], ArrivedController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('delete Arrived', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ArrivedController.prototype, "remove", null);
exports.ArrivedController = ArrivedController = __decorate([
    (0, common_1.Controller)('arrived'),
    __metadata("design:paramtypes", [arrived_service_1.ArrivedService])
], ArrivedController);
//# sourceMappingURL=arrived.controller.js.map