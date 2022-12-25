import { BadRequestResponse } from '@/types';
import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class BadRequestBody implements BadRequestResponse {
  @ApiProperty({ example: HttpStatus.BAD_REQUEST })
  statusCode: HttpStatus.BAD_REQUEST;

  @ApiProperty()
  message: string;

  @ApiProperty({
    properties: {
      property: {
        type: 'string',
        example: 'error',
      },
    },
  })
  errors: Record<string, string>;
}
