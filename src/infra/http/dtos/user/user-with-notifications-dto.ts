import { Notification } from '@prisma/client';
import { UserDTO } from './user-dto';
import { ApiProperty } from '@nestjs/swagger';
import { NotificationDTO } from '../notification';
import { UserWithNotifications } from '@/types';

export class UserWithNotificationsDTO
  extends UserDTO
  implements Omit<UserWithNotifications, 'password'>
{
  @ApiProperty({ type: NotificationDTO, isArray: true })
  notifications: Array<Notification>;
}
