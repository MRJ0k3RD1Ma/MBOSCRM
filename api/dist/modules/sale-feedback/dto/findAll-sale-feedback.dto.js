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
exports.FindAllSaleFeedbackDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
const id_dto_1 = require("src/common/dtos/id.dto");
const pagination_dto_1 = require("src/common/dtos/pagination.dto");
class FindAllSaleFeedbackDto extends pagination_dto_1.PaginationDto {
}
exports.FindAllSaleFeedbackDto = FindAllSaleFeedbackDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'abs' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FindAllSaleFeedbackDto.prototype, "name", void 0);
__decorate([
    (0, id_dto_1.IsId)(false),
    __metadata("design:type", Number)
], FindAllSaleFeedbackDto.prototype, "saleId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'NEW' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.SaleFeedbackState),
    __metadata("design:type", String)
], FindAllSaleFeedbackDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'NOT_COMPLETED' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.SaleFeedbackResult),
    __metadata("design:type", String)
], FindAllSaleFeedbackDto.prototype, "result", void 0);
//# sourceMappingURL=findAll-sale-feedback.dto.js.map