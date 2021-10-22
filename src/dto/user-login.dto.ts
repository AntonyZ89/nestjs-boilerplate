import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { User } from 'src/entities/user.entity';
import { IsUnique } from 'src/validators/unique.validator';

export class UserLoginDTO {
  @IsEmail()
  @IsNotEmpty()
  @IsUnique(User)
  email: string;

  @IsString()
  @Length(6)
  @IsNotEmpty()
  password: string;
}
