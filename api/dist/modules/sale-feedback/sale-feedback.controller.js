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
exports.SaleFeedbackController = void 0;
const common_1 = require("@nestjs/common");
const sale_feedback_service_1 = require("./sale-feedback.service");
const create_sale_feedback_dto_1 = require("./dto/create-sale-feedback.dto");
const update_sale_feedback_dto_1 = require("./dto/update-sale-feedback.dto");
const findAll_sale_feedback_dto_1 = require("./dto/findAll-sale-feedback.dto");
const decorator_auth_1 = require("src/common/auth/decorator.auth");
const role_enum_1 = require("src/common/auth/roles/role.enum");
let SaleFeedbackController = class SaleFeedbackController {
    constructor(saleFeedbackService) {
        this.saleFeedbackService = saleFeedbackService;
    }
    create(createSaleFeedbackDto) {
        return this.saleFeedbackService.create(createSaleFeedbackDto);
    }
    findAll(dto) {
        return this.saleFeedbackService.findAll(dto);
    }
    findOne(id) {
        return this.saleFeedbackService.findOne(id);
    }
    findOneSaleFeedback(alias) {
        return this.saleFeedbackService.findOneByAlias(alias);
    }
    update(alias, updateSaleFeedbackDto) {
        return this.saleFeedbackService.update(alias, updateSaleFeedbackDto);
    }
    updateState(dto, alias) {
        return this.saleFeedbackService.updateState(dto, alias);
    }
    remove(id) {
        return this.saleFeedbackService.remove(+id);
    }
};
exports.SaleFeedbackController = SaleFeedbackController;
__decorate([
    (0, common_1.Post)(),
    (0, decorator_auth_1.DecoratorWrapper)('saleFeedbackCreate', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sale_feedback_dto_1.CreateSaleFeedbackDto]),
    __metadata("design:returntype", void 0)
], SaleFeedbackController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorator_auth_1.DecoratorWrapper)('saleFeedbackGetAll'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findAll_sale_feedback_dto_1.FindAllSaleFeedbackDto]),
    __metadata("design:returntype", void 0)
], SaleFeedbackController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('id/:id'),
    (0, decorator_auth_1.DecoratorWrapper)('saleFeedbackGetOne'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SaleFeedbackController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('alias/:alias'),
    (0, decorator_auth_1.DecoratorWrapper)('saleFeedbackGetOneWIthAlias'),
    __param(0, (0, common_1.Param)('alias')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SaleFeedbackController.prototype, "findOneSaleFeedback", null);
__decorate([
    (0, common_1.Patch)(':alias'),
    (0, decorator_auth_1.DecoratorWrapper)('saleFeedbackUpdate'),
    __param(0, (0, common_1.Param)('alias')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_sale_feedback_dto_1.UpdateSaleFeedbackDto]),
    __metadata("design:returntype", void 0)
], SaleFeedbackController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':alias/state'),
    (0, decorator_auth_1.DecoratorWrapper)('saleFeedbackUpdateState'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('alias')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_sale_feedback_dto_1.UpdateStateDto, String]),
    __metadata("design:returntype", void 0)
], SaleFeedbackController.prototype, "updateState", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('saleFeedbackDelete', true, [role_enum_1.Role.Admin]),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SaleFeedbackController.prototype, "remove", null);
exports.SaleFeedbackController = SaleFeedbackController = __decorate([
    (0, common_1.Controller)('sale-feedback'),
    __metadata("design:paramtypes", [sale_feedback_service_1.SaleFeedbackService])
], SaleFeedbackController);
//# sourceMappingURL=sale-feedback.controller.js.map