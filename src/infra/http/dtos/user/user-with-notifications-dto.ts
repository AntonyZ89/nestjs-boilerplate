import { UserWithNotifications } from '@/types';
import { ApiProperty } from '@nestjs/swagger';
import { NotificationDTO } from '../notification';
import { UserDTO } from './user-dto';

export class UserWithNotificationsDTO
  extends UserDTO
  implements UserWithNotifications
{
  @ApiProperty({ type: NotificationDTO, isArray: true })
  notifications: Array<NotificationDTO>;
}
