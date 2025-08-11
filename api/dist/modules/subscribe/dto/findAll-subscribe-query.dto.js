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
exports.FindAllSubscribeQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const id_dto_1 = require("../../../common/dtos/id.dto");
const pagination_dto_1 = require("../../../common/dtos/pagination.dto");
class FindAllSubscribeQueryDto extends pagination_dto_1.PaginationDto {
}
exports.FindAllSubscribeQueryDto = FindAllSubscribeQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 100000 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], FindAllSubscribeQueryDto.prototype, "minPrice", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 200000 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], FindAllSubscribeQueryDto.prototype, "maxPrice", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2025-07-01' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], FindAllSubscribeQueryDto.prototype, "fromDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2025-07-30' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], FindAllSubscribeQueryDto.prototype, "toDate", void 0);
__decorate([
    (0, id_dto_1.IsId)(false),
    __metadata("design:type", Number)
], FindAllSubscribeQueryDto.prototype, "clientId", void 0);
__decorate([
    (0, id_dto_1.IsId)(false),
    __metadata("design:type", Number)
], FindAllSubscribeQueryDto.prototype, "saleId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: client_1.SubscribeState }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.SubscribeState),
    __metadata("design:type", String)
], FindAllSubscribeQueryDto.prototype, "state", void 0);
//# sourceMappingURL=findAll-subscribe-query.dto.js.map