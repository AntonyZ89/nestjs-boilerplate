import { PartialType } from '@nestjs/mapped-types';
import { UserLoginDTO } from './user-login.dto';

export class UserSignupDTO extends PartialType(UserLoginDTO) {}
