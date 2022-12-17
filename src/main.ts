import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
          statusCode: this.errorHttpStatusCode,
          errors: result,
          message: 'Ocorreu um erro.',
        });
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();
