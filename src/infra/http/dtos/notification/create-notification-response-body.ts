import { ResponseWithModel } from '@/types';
import { Notification } from '@application/entities';
import { ApiProperty } from '@nestjs/swagger';
import { Notification as PrismaNotification } from '@prisma/client';

export class CreateNotificationResponseBody implements ResponseWithModel {
  @ApiProperty()
  message: string;

  @ApiProperty({ type: Notification })
  model: PrismaNotification;
}
