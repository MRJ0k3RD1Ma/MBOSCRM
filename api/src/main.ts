import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { env } from './common/config';
import { SwaggerModule } from '@nestjs/swagger';
import { ApiSwaggerOptions } from './common/swagger/config.swagger';
import { HttpExceptionFilter } from './common/filter/httpException.filter';
import { apiReference } from '@scalar/nestjs-api-reference';
import { sign } from 'jsonwebtoken';
import { Role } from './common/auth/roles/role.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('/api');

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        const messages = errors.map((err) => {
          const constraints = Object.values(err.constraints || {});
          return `${err.property}: ${constraints.join(', ')}`;
        });
        return new BadRequestException(messages.join(' | '));
      },
    }),
  );

  if (env.ENV == 'dev') {
    const ApiDocs = SwaggerModule.createDocument(app, ApiSwaggerOptions);
    SwaggerModule.setup('docs', app, ApiDocs, {
      customCssUrl: './public/swagger.css',
    });
    app.use(
      '/ui',
      apiReference({
        content: ApiDocs,
        theme: 'deepSpace',
        layout: 'modern',
        defaultHttpClient: {
          targetKey: 'node',
          clientKey: 'axios',
        },
        persistAuth: true,
        authentication: {
          preferredSecurityScheme: 'token',
          securitySchemes: {
            token: {
              token: sign(
                {
                  id: 1,
                  role: Role.Admin,
                  ignoreVersion: true,
                  tokenVersion: 0,
                },
                env.ACCESS_TOKEN_SECRET,
                {},
              ),
            },
          },
        },
      }),
    );
  }
  await app.listen(env.PORT || 3000);
}
bootstrap();
