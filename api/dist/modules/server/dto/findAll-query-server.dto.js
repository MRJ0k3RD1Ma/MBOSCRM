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
exports.FindAllQueryServer = void 0;
const swagger_1 = require("@nestjs/swagger");
const name_dto_1 = require("../../../common/dtos/name.dto");
const pagination_dto_1 = require("../../../common/dtos/pagination.dto");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class FindAllQueryServer extends pagination_dto_1.PaginationDto {
}
exports.FindAllQueryServer = FindAllQueryServer;
__decorate([
    (0, name_dto_1.IsName)(false),
    __metadata("design:type", String)
], FindAllQueryServer.prototype, "name", void 0);
__decorate([
    (0, name_dto_1.IsName)(false),
    __metadata("design:type", String)
], FindAllQueryServer.prototype, "responsible", void 0);
__decorate([
    (0, name_dto_1.IsName)(false),
    __metadata("design:type", String)
], FindAllQueryServer.prototype, "plan", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2025-07-01' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], FindAllQueryServer.prototype, "fromDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2025-07-30' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], FindAllQueryServer.prototype, "toDate", void 0);
//# sourceMappingURL=findAll-query-server.dto.js.map