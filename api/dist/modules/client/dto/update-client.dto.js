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
exports.UpdateClientDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const id_dto_1 = require("../../../common/dtos/id.dto");
const name_dto_1 = require("../../../common/dtos/name.dto");
class UpdateClientDto {
}
exports.UpdateClientDto = UpdateClientDto;
__decorate([
    (0, name_dto_1.IsName)(false),
    __metadata("design:type", String)
], UpdateClientDto.prototype, "name", void 0);
__decorate([
    (0, name_dto_1.IsName)(false),
    __metadata("design:type", String)
], UpdateClientDto.prototype, "inn", void 0);
__decorate([
    (0, name_dto_1.IsName)(false),
    __metadata("design:type", String)
], UpdateClientDto.prototype, "description", void 0);
__decorate([
    (0, name_dto_1.IsName)(false),
    __metadata("design:type", String)
], UpdateClientDto.prototype, "address", void 0);
__decorate([
    (0, id_dto_1.IsId)(false),
    __metadata("design:type", Number)
], UpdateClientDto.prototype, "regionId", void 0);
__decorate([
    (0, id_dto_1.IsId)(false),
    __metadata("design:type", Number)
], UpdateClientDto.prototype, "districtId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateClientDto.prototype, "phone", void 0);
__decorate([
    (0, id_dto_1.IsId)(false),
    __metadata("design:type", Number)
], UpdateClientDto.prototype, "typeId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateClientDto.prototype, "balance", void 0);
//# sourceMappingURL=update-client.dto.js.map