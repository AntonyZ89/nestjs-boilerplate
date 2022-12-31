import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { DataSource, Not } from 'typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueConstraint implements ValidatorConstraintInterface {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async validate(value: any, args: ValidationArguments) {
    const entity = args.object as any;
    const column = args.property;

    const repository = this.dataSource.getRepository(entity.constructor);

    const query = repository.createQueryBuilder().where({ [column]: value });

    if (entity.hasId()) {
      query.andWhere({ id: Not(entity.id) });
    }

    return !(await query.getExists());
  }

  defaultMessage(): string {
    return 'Already exists.';
  }
}

export function UniqueValidator(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'UniqueValidator',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: UniqueConstraint,
    });
  };
}
