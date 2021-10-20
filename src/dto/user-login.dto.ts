import { IsEmail, IsString } from 'class-validator';

export class UserLoginDTO {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
