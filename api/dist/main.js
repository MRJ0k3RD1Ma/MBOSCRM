"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const config_1 = require("./common/config");
const swagger_1 = require("@nestjs/swagger");
const config_swagger_1 = require("./common/swagger/config.swagger");
const httpException_filter_1 = require("./common/filter/httpException.filter");
const nestjs_api_reference_1 = require("@scalar/nestjs-api-reference");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.setGlobalPrefix('/api');
    app.useGlobalFilters(new httpException_filter_1.HttpExceptionFilter());
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        exceptionFactory: (errors) => {
            const messages = errors.map((err) => {
                const constraints = Object.values(err.constraints || {});
                return `${err.property}: ${constraints.join(', ')}`;
            });
            return new common_1.BadRequestException(messages.join(' | '));
        },
    }));
    if (config_1.env.ENV == 'dev') {
        const ApiDocs = swagger_1.SwaggerModule.createDocument(app, config_swagger_1.ApiSwaggerOptions);
        app.use('/docs', (0, nestjs_api_reference_1.apiReference)({ content: ApiDocs, theme: 'bluePlanet' }));
    }
    await app.listen(config_1.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map