import { PartialType } from '@nestjs/mapped-types';
import { UserCreateDto } from '@dto';

export class UserUpdateDto extends PartialType(UserCreateDto) {}
