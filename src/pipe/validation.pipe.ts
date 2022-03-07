import { ArgumentMetadata, BadRequestException, HttpStatus, Injectable, PipeTransform, Type } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      console.debug(errors[0]);
      const r: { [key: string]: any } = {
        statusCode: HttpStatus.BAD_REQUEST,
        errors: {},
        message: 'Bad Request',
      };
      errors.forEach((error) => (r.errors[error.property] = Object.values(error.constraints).at(-1)));
      throw new BadRequestException(r);
    }
    return value;
  }

  private toValidate(metatype: Type): boolean {
    const types: Type[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
