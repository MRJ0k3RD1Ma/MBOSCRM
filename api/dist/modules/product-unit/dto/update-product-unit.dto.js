"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductUnitDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_product_unit_dto_1 = require("./create-product-unit.dto");
class UpdateProductUnitDto extends (0, swagger_1.PartialType)(create_product_unit_dto_1.CreateProductUnitDto) {
}
exports.UpdateProductUnitDto = UpdateProductUnitDto;
//# sourceMappingURL=update-product-unit.dto.js.map