"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePaymeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_payme_dto_1 = require("./create-payme.dto");
class UpdatePaymeDto extends (0, swagger_1.PartialType)(create_payme_dto_1.CreatePaymeDto) {
}
exports.UpdatePaymeDto = UpdatePaymeDto;
//# sourceMappingURL=update-payme.dto.js.map