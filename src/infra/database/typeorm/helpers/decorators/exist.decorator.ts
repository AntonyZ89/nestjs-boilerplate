import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { DataSource } from 'typeorm';
import { BaseEntity } from '@infra/database/typeorm/entities';

type Param = typeof BaseEntity;

@ValidatorConstraint({ async: true })
@Injectable()
export class ExistConstraint implements ValidatorConstraintInterface {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async validate(id: any, args: ValidationArguments) {
    const entityClass: Param = args.constraints.at(0);

    const exist = await this.dataSource
      .getRepository<any>(entityClass)
      .findOneBy({ id });

    return exist !== null;
  }

  defaultMessage(): string {
    return 'Invalid id.';
  }
}

export function ExistValidator(
  entityClass: Param,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'ExistValidator',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [entityClass],
      options: validationOptions,
      validator: ExistConstraint,
    });
  };
}
