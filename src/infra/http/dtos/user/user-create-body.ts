import { User } from '@infra/database/typeorm/entities';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class UserCreateBody implements Pick<User, 'username' | 'password'> {
  @IsString()
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

  @IsString()
  @IsNotEmpty()
  @Length(6)
  @ApiProperty()
  password: string;
}
