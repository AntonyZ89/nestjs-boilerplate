import { ResponseWithModel } from '@/types';
import { Notification } from '@infra/database/typeorm/entities';
import { ApiProperty } from '@nestjs/swagger';

export class ReadNotificationBody implements ResponseWithModel {
  @ApiProperty({ type: Notification })
  model: Notification;

  @ApiProperty()
  message: string;
}
