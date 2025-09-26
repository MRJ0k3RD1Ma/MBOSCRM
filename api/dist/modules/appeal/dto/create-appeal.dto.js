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
exports.CreateAppealDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class CreateAppealDto {
}
exports.CreateAppealDto = CreateAppealDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ali Valiyev', description: 'Appeal yuboruvchi shaxsning ismi' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAppealDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+998901234567', description: 'Appeal yuboruvchi telefon raqami' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^\+998(9[0-9]|3[3]|7[1]|8[8]|6[1])[0-9]{7}$/, {
        message: 'Telefon raqam faqat +998 va to‘g‘ri kod bilan boshlanishi kerak',
    }),
    __metadata("design:type", String)
], CreateAppealDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Texnik muammo', description: 'Appeal mavzusi' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAppealDto.prototype, "subject", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Saytda ro‘yxatdan o‘ta olmayapman', description: 'Appeal tafsilotlari' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAppealDto.prototype, "detail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.AppealState, example: client_1.AppealState.NEW, description: 'Appeal holati' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.AppealState),
    __metadata("design:type", String)
], CreateAppealDto.prototype, "state", void 0);
//# sourceMappingURL=create-appeal.dto.js.map