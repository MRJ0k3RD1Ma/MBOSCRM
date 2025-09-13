"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSaleProductDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_sale_product_dto_1 = require("./create-sale-product.dto");
class UpdateSaleProductDto extends (0, swagger_1.PartialType)(create_sale_product_dto_1.CreateSaleProductDto) {
}
exports.UpdateSaleProductDto = UpdateSaleProductDto;
//# sourceMappingURL=update-sale-product.dto.js.map