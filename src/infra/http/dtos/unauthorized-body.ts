import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedBody {
  @ApiProperty({ example: HttpStatus.UNAUTHORIZED })
  statusCode: HttpStatus.UNAUTHORIZED;

  @ApiProperty()
  message: string;
}
