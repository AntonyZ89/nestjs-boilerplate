import { ApiProperty } from '@nestjs/swagger';

export class LoginBody {
  @ApiProperty({ example: 'my.username' })
  username: string;

  @ApiProperty({ example: '12345678' })
  password: string;
}
