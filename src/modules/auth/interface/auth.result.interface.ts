import { HttpStatus } from '@nestjs/common';

export interface AuthResult {
  status: HttpStatus;
  message: any;
}
