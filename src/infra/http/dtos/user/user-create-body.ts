import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsNotEmpty, Length, Matches } from 'class-validator';

export class UserCreateBody
  implements Omit<User, 'id' | 'createdAt' | 'deletedAt'>
{
  @IsNotEmpty()
  @ApiProperty({
    minLength: 6,
    maxLength: 24,
    description:
      'The user name. Containing only letters, numbers and the underscore character.',
  })
  @Matches(/^[a-zA-Z0-9_]{6,24}$/, {
    message:
      'username must be between 6 and 24 characters long and contain only letters, numbers, and underscores.',
  })
  username: string;

  @IsNotEmpty()
  @Length(6)
  @ApiProperty()
  password: string;
}
