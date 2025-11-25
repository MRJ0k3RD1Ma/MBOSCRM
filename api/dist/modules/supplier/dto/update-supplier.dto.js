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
exports.UpdateSupplierDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const name_dto_1 = require("../../../common/dtos/name.dto");
class UpdateSupplierDto {
}
exports.UpdateSupplierDto = UpdateSupplierDto;
__decorate([
    (0, name_dto_1.IsName)(false),
    __metadata("design:type", String)
], UpdateSupplierDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '+998901234567' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^\+998(9[0-9]|3[3]|7[1]|8[8]|6[1])[0-9]{7}$/, {
        message: 'Telefon raqam faqat +998 va to‘g‘ri kod bilan boshlanishi kerak',
    }),
    __metadata("design:type", String)
], UpdateSupplierDto.prototype, "phone", void 0);
__decorate([
    (0, name_dto_1.IsName)(false),
    __metadata("design:type", String)
], UpdateSupplierDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '+998901234567' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^\+998(9[0-9]|3[3]|7[1]|8[8]|6[1])[0-9]{7}$/, {
        message: 'Telefon raqam faqat +998 va to‘g‘ri kod bilan boshlanishi kerak',
    }),
    __metadata("design:type", String)
], UpdateSupplierDto.prototype, "phoneTwo", void 0);
//# sourceMappingURL=update-supplier.dto.js.map