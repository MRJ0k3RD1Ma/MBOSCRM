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
exports.SimCardController = void 0;
const common_1 = require("@nestjs/common");
const decorator_auth_1 = require("src/common/auth/decorator.auth");
const role_enum_1 = require("src/common/auth/roles/role.enum");
const sim_card_service_1 = require("./sim-card.service");
const create_sim_card_dto_1 = require("./dto/create-sim-card.dto");
const findAll_sim_card_dto_1 = require("./dto/findAll-sim-card.dto");
const update_sim_card_dto_1 = require("./dto/update-sim-card.dto");
let SimCardController = class SimCardController {
    constructor(simCardService) {
        this.simCardService = simCardService;
    }
    create(createSimCardDto) {
        return this.simCardService.create(createSimCardDto);
    }
    findAll(query) {
        return this.simCardService.findAll(query);
    }
    findOne(id) {
        return this.simCardService.findOne(+id);
    }
    update(id, updateSimCardDto) {
        return this.simCardService.update(+id, updateSimCardDto);
    }
    remove(id) {
        return this.simCardService.remove(+id);
    }
};
exports.SimCardController = SimCardController;
__decorate([
    (0, common_1.Post)(),
    (0, decorator_auth_1.DecoratorWrapper)('create SimCard', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sim_card_dto_1.CreateSimCardDto]),
    __metadata("design:returntype", void 0)
], SimCardController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorator_auth_1.DecoratorWrapper)('Get All Sim Cards', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findAll_sim_card_dto_1.FindAllSimCardQueryDto]),
    __metadata("design:returntype", void 0)
], SimCardController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('Get SimCard by ID', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SimCardController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('Update Sim Card', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_sim_card_dto_1.UpdateSimCardDto]),
    __metadata("design:returntype", void 0)
], SimCardController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('Delete Sim Card', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SimCardController.prototype, "remove", null);
exports.SimCardController = SimCardController = __decorate([
    (0, common_1.Controller)('sim-card'),
    __metadata("design:paramtypes", [sim_card_service_1.SimCardService])
], SimCardController);
//# sourceMappingURL=sim-card.controller.js.map