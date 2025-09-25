"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAppealDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_appeal_dto_1 = require("./create-appeal.dto");
class UpdateAppealDto extends (0, swagger_1.PartialType)(create_appeal_dto_1.CreateAppealDto) {
}
exports.UpdateAppealDto = UpdateAppealDto;
//# sourceMappingURL=update-appeal.dto.js.map