import { BadRequestResponse } from '@/types';
import { BadRequestException, HttpStatus } from '@nestjs/common';

type Params = Partial<BadRequestResponse> & Pick<BadRequestResponse, 'errors'>;

export class ValidationException extends BadRequestException {
  constructor(private objectOrError: Params) {
    const result: BadRequestResponse = Object.assign(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Invalid data.',
      },
      objectOrError,
    );

    super(result);
  }
}
