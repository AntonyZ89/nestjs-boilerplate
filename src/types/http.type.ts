import { HttpStatus } from '@nestjs/common';

export interface Response {
  message: string;
}

export interface ResponseWithModel extends Response {
  model: any;
}

export interface BadRequestResponse {
  statusCode: HttpStatus;
  message: string;
  errors: Record<string, string>;
}
