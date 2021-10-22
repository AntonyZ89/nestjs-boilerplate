import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments as ValidationArgumentsBase,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { EntityTarget, getManager } from 'typeorm';

interface ValidationArguments extends ValidationArgumentsBase {
  constraints: [EntityTarget<unknown>];
}

export function IsUnique(entity: EntityTarget<unknown>, validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsUnique',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: UniqueRule,
      constraints: [entity],
    });
  };
}

@ValidatorConstraint({ name: 'IsUnique', async: true })
@Injectable()
export class UniqueRule implements ValidatorConstraintInterface {
  async validate(value: string, args: ValidationArguments): Promise<boolean> {
    return !(await getManager()
      .getRepository(args.constraints[0])
      .findOne({ [args.property]: value }));
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} already exist`;
  }
}
