import { ResponseWithModel } from '@/types';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UserDTO } from './user-dto';

export class UserCreateResponse implements ResponseWithModel {
  // TODO verificar se o tipo está correto no swagger
  @ApiProperty({ type: UserDTO })
  model: User;

  @ApiProperty()
  message: string;
}
