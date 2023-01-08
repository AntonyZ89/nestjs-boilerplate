import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5hb3NlaSIsInN1YiI6MiwiaWF0IjoxNjcxOTU0OT...',
  })
  access_token: string;

  @ApiProperty({ example: '1673129009916' })
  expires_in: number;
}
