"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePaidClientDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_paid_client_dto_1 = require("./create-paid-client.dto");
class UpdatePaidClientDto extends (0, swagger_1.PartialType)(create_paid_client_dto_1.CreatePaidClientDto) {
}
exports.UpdatePaidClientDto = UpdatePaidClientDto;
//# sourceMappingURL=update-paid-client.dto.js.map