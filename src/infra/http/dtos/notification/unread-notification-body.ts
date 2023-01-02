import { ResponseWithModel } from '@/types';
import { Notification } from '@infra/database/typeorm/entities';
import { ApiProperty } from '@nestjs/swagger';

export class UnreadNotificationBody implements ResponseWithModel {
  @ApiProperty({ type: Notification })
  model: Notification;

  @ApiProperty()
  message: string;
}
