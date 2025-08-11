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
exports.FindAllSupplierQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const name_dto_1 = require("../../../common/dtos/name.dto");
const pagination_dto_1 = require("../../../common/dtos/pagination.dto");
class FindAllSupplierQueryDto extends pagination_dto_1.PaginationDto {
}
exports.FindAllSupplierQueryDto = FindAllSupplierQueryDto;
__decorate([
    (0, name_dto_1.IsName)(false),
    __metadata("design:type", String)
], FindAllSupplierQueryDto.prototype, "name", void 0);
__decorate([
    (0, name_dto_1.IsName)(false),
    __metadata("design:type", String)
], FindAllSupplierQueryDto.prototype, "description", void 0);
__decorate([
    (0, name_dto_1.IsName)(false),
    __metadata("design:type", String)
], FindAllSupplierQueryDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)((params) => (params.value == 'true' ? true : false)),
    __metadata("design:type", Boolean)
], FindAllSupplierQueryDto.prototype, "isPositiveBalance", void 0);
//# sourceMappingURL=findAll-supplier.dto.js.map