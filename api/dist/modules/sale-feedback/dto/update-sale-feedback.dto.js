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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AliasParamDto = exports.UpdateSaleFeedbackDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_sale_feedback_dto_1 = require("./create-sale-feedback.dto");
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
class UpdateSaleFeedbackDto extends (0, swagger_1.PartialType)(create_sale_feedback_dto_1.CreateSaleFeedbackDto) {
}
exports.UpdateSaleFeedbackDto = UpdateSaleFeedbackDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'TODO' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.SaleFeedbackState),
    __metadata("design:type", String)
], UpdateSaleFeedbackDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'NOT_COMPLETED' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.SaleFeedbackResult),
    __metadata("design:type", String)
], UpdateSaleFeedbackDto.prototype, "result", void 0);
class AliasParamDto {
}
exports.AliasParamDto = AliasParamDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], AliasParamDto.prototype, "alias", void 0);
//# sourceMappingURL=update-sale-feedback.dto.js.map