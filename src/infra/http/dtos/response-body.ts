import { Response } from '@/types';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseBody implements Response {
  @ApiProperty()
  message: string;
}
