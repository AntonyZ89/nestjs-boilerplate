import { ValidationException } from '@infra/exceptions';
import { HttpStatus, ValidationPipe } from '@nestjs/common';

export function isTest(): boolean {
  return process.env.NODE_ENV === 'test';
}

export function generateValidationPipe() {
  return new ValidationPipe({
    whitelist: true,
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

      return new ValidationException({
        statusCode: this.errorHttpStatusCode || HttpStatus.BAD_REQUEST,
        errors: result,
      });
    },
  });
}
