import { ResponseWithModel } from '@/types';
import { ApiProperty } from '@nestjs/swagger';
import { UserDTO } from './user-dto';

type Model = Omit<UserDTO, 'password' | 'notifications'>;

export class UserCreateResponse implements ResponseWithModel {
  @ApiProperty({ type: UserDTO })
  model: Model;

  @ApiProperty()
  message: string;
}
