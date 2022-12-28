import { User } from '@infra/database/typeorm/entities';
import { ApiProperty } from '@nestjs/swagger';

export class UserDTO implements Omit<User, 'password' | 'notifications'> {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty({ type: 'string', format: 'date-time' })
  createdAt: Date;

  @ApiProperty({ type: 'string', format: 'date-time' })
  updatedAt: Date;

  @ApiProperty({ type: 'string', format: 'date-time', nullable: true })
  deletedAt: Date | null;
}
