import { ResponseWithModel } from '@/types';
import { ApiProperty } from '@nestjs/swagger';
import { NotificationDTO } from './notification-dto';

export class CreateNotificationResponseBody implements ResponseWithModel {
  @ApiProperty()
  message: string;

  @ApiProperty({ type: NotificationDTO })
  model: NotificationDTO;
}
