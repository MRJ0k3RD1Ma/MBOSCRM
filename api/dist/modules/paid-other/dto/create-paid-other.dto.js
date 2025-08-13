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
exports.CreatePaidOtherDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const id_dto_1 = require("../../../common/dtos/id.dto");
class CreatePaidOtherDto {
}
exports.CreatePaidOtherDto = CreatePaidOtherDto;
__decorate([
    (0, id_dto_1.IsId)(),
    __metadata("design:type", Number)
], CreatePaidOtherDto.prototype, "groupId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.PaidOtherType }),
    (0, class_validator_1.IsEnum)(client_1.PaidOtherType),
    __metadata("design:type", String)
], CreatePaidOtherDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePaidOtherDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2025-07-29T12:12:44.882Z' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CreatePaidOtherDto.prototype, "paidDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 200, description: 'Payment price' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePaidOtherDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Payment method ID' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreatePaidOtherDto.prototype, "paymentId", void 0);
//# sourceMappingURL=create-paid-other.dto.js.map