import { PartialType } from '@nestjs/swagger';
import { UserCreateBody } from './user-create-body';

export class UserUpdateBody extends PartialType(UserCreateBody) {}
