import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class UserLoginDTO {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'teste@gmail.com' })
  readonly email: string;

  @IsString()
  @Length(6)
  @IsNotEmpty()
  @ApiProperty({ example: '123456' })
  password: string;
}
