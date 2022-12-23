import {
  BadRequestException,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { BadRequestResponse, SwaggerTags } from './types';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API')
    .setVersion('1.0')
    .addTag(SwaggerTags.NOTIFICATION, 'Notificação CRUD API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      // TODO melhorar esse exception factory, buscar sobre async exception factory ou algo relacionado
      // TODO customizar message e status code pelo controller
      // TODO buscar sobre async validator
      exceptionFactory(errors) {
        const result: Record<string, string> = {};

        errors.forEach((error) => {
          if (error.constraints) {
            const message = Object.values(error.constraints).at(0);

            if (message) {
              result[error.property] = message; // get first error
            }
          }
        });

        return new BadRequestException({
          statusCode: this.errorHttpStatusCode || HttpStatus.BAD_REQUEST,
          errors: result,
          message: 'Ocorreu um erro.',
        } satisfies BadRequestResponse);
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();
