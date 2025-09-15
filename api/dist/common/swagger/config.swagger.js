"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiSwaggerOptions = void 0;
const swagger_1 = require("@nestjs/swagger");
exports.ApiSwaggerOptions = new swagger_1.DocumentBuilder()
    .setTitle('CRM API')
    .setDescription('API documentation for CRM')
    .setVersion('1.0')
    .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    name: 'JWT',
    description: 'Enter JWT token',
    in: 'header',
}, 'token')
    .build();
//# sourceMappingURL=config.swagger.js.map