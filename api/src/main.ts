import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { env } from './common/config';
import { SwaggerModule } from '@nestjs/swagger';
import { ApiSwaggerOptions } from './common/swagger/config.swagger';
import { HttpExceptionFilter } from './common/filter/httpException.filter';
import { apiReference } from '@scalar/nestjs-api-reference';

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
    //themes:  alternate, default, moon, purple, solarized, bluePlanet, saturn, kepler, mars, deepSpace, laserwave, none
    app.use('/docs', apiReference({ content: ApiDocs, theme: 'bluePlanet' }));
  }
  await app.listen(env.PORT || 3000);
}
bootstrap();
