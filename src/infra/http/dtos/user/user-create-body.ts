import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsNotEmpty, Length } from 'class-validator';

export class UserCreateBody
  implements Omit<User, 'id' | 'createdAt' | 'deletedAt'>
{
  @IsNotEmpty()
  @Length(6, 24)
  @ApiProperty({ minLength: 6, maxLength: 24 })
  name: string;
}
