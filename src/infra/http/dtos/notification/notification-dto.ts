import { ApiProperty } from '@nestjs/swagger';
import { Notification } from '@prisma/client';

export class NotificationDTO implements Notification {
  @ApiProperty()
  id: number;

  @ApiProperty()
  recipientId: string;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  content: string;

  @ApiProperty()
  category: string;

  @ApiProperty({ type: 'string', format: 'date-time', nullable: true })
  readAt: Date | null;

  @ApiProperty({ type: 'string', format: 'date-time', nullable: true })
  canceledAt: Date | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ type: 'string', format: 'date-time', nullable: true })
  deletedAt: Date | null;
}
