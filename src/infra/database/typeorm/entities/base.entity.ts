import { ValidationException } from '@infra/exceptions';
import { validate } from 'class-validator';
import { BeforeInsert, BeforeUpdate } from 'typeorm';

export abstract class BaseEntity {
  #errors: Record<string, string> = {};

  load(params: Partial<this>): void {
    Object.assign(this, params);
  }

  beforeValidate(): void | Promise<void> {
    this.#errors = {};
  }

  @BeforeInsert()
  @BeforeUpdate()
  async validate(): Promise<void> {
    await this.beforeValidate();

    (await validate(this)).forEach((error) => {
      if (!error.constraints) return;

      const message = Object.values(error.constraints).at(0)!;

      this.addError(error.property, message);
    });

    if (this.hasErrors) {
      throw new ValidationException({ errors: this.errors });
    }
  }

  addError(property: string, message: string): void {
    this.#errors[property] = message;
  }

  addErrors(errors: Record<string, string>): void {
    Object.assign(this.#errors, errors);
  }

  get errors(): Record<string, string> {
    return this.#errors;
  }

  get hasErrors(): boolean {
    return Object.keys(this.#errors).length > 0;
  }

  hasId(): boolean {
    return 'id' in this && !!this.id;
  }
}
