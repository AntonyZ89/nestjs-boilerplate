import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class NotFoundBody {
  @ApiProperty({ example: HttpStatus.NOT_FOUND })
  statusCode: HttpStatus.NOT_FOUND;

  @ApiProperty()
  message: string;
}
