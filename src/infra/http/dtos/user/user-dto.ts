import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserDTO implements Omit<User, 'password'> {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty({ type: 'string', format: 'date-time' })
  createdAt: Date;

  @ApiProperty({ type: 'string', format: 'date-time', nullable: true })
  deletedAt: Date | null;
}
