import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/entities/user.entity';
import { GenderEnum } from 'src/enums/gender.enum';
import { IsUnique } from 'src/validators/unique.validator';
import { UserLoginDTO } from './user-login.dto';

export class UserSignupDTO extends UserLoginDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  @IsUnique(User)
  @ApiProperty({ example: 'teste@gmail.com' })
  override readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly surname: string;

  @IsNotEmpty()
  @IsString()
  readonly birthday: Date;

  @IsNotEmpty()
  @IsEnum(GenderEnum)
  readonly gender: GenderEnum;
}
