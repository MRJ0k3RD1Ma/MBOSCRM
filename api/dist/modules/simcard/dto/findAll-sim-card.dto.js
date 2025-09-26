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
exports.FindAllSimCardQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const id_dto_1 = require("../../../common/dtos/id.dto");
const name_dto_1 = require("../../../common/dtos/name.dto");
const pagination_dto_1 = require("../../../common/dtos/pagination.dto");
class FindAllSimCardQueryDto extends pagination_dto_1.PaginationDto {
}
exports.FindAllSimCardQueryDto = FindAllSimCardQueryDto;
__decorate([
    (0, id_dto_1.IsId)(false),
    __metadata("design:type", Number)
], FindAllSimCardQueryDto.prototype, "clientId", void 0);
__decorate([
    (0, name_dto_1.IsName)(false),
    __metadata("design:type", String)
], FindAllSimCardQueryDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, name_dto_1.IsName)(false),
    __metadata("design:type", String)
], FindAllSimCardQueryDto.prototype, "company", void 0);
__decorate([
    (0, name_dto_1.IsName)(false),
    __metadata("design:type", String)
], FindAllSimCardQueryDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], FindAllSimCardQueryDto.prototype, "isActive", void 0);
//# sourceMappingURL=findAll-sim-card.dto.js.map