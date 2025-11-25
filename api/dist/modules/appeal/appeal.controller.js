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
exports.AppealController = void 0;
const common_1 = require("@nestjs/common");
const appeal_service_1 = require("./appeal.service");
const create_appeal_dto_1 = require("./dto/create-appeal.dto");
const update_appeal_dto_1 = require("./dto/update-appeal.dto");
const findAll_appeal_dto_1 = require("./dto/findAll-appeal.dto");
const decorator_auth_1 = require("src/common/auth/decorator.auth");
const role_enum_1 = require("src/common/auth/roles/role.enum");
let AppealController = class AppealController {
    constructor(appealService) {
        this.appealService = appealService;
    }
    create(createAppealDto) {
        return this.appealService.create(createAppealDto);
    }
    findAll(dto) {
        return this.appealService.findAll(dto);
    }
    findOne(id) {
        return this.appealService.findOne(+id);
    }
    update(id, updateAppealDto, req) {
        const modifyId = req.user.id;
        return this.appealService.update(+id, updateAppealDto, modifyId);
    }
    remove(id) {
        return this.appealService.remove(+id);
    }
};
exports.AppealController = AppealController;
__decorate([
    (0, common_1.Post)(),
    (0, decorator_auth_1.DecoratorWrapper)('createAppeal'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_appeal_dto_1.CreateAppealDto]),
    __metadata("design:returntype", void 0)
], AppealController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorator_auth_1.DecoratorWrapper)('findAllAppeal'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findAll_appeal_dto_1.FindAllAppealDto]),
    __metadata("design:returntype", void 0)
], AppealController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('findOneAppeal'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppealController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('updateAppeal', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_appeal_dto_1.UpdateAppealDto, Object]),
    __metadata("design:returntype", void 0)
], AppealController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('removeAppeal', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppealController.prototype, "remove", null);
exports.AppealController = AppealController = __decorate([
    (0, common_1.Controller)('appeal'),
    __metadata("design:paramtypes", [appeal_service_1.AppealService])
], AppealController);
//# sourceMappingURL=appeal.controller.js.map