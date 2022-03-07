import { HttpStatus } from '@nestjs/common';

export interface AuthResult<T> {
  status: HttpStatus;
  message: T;
}
