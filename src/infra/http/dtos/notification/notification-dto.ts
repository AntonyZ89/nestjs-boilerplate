import { Notification } from '@infra/database/typeorm/entities';
import { ApiProperty } from '@nestjs/swagger';

export class NotificationDTO extends Notification {
  @ApiProperty()
  id: number;

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

  @ApiProperty({ type: 'string', format: 'date-time' })
  createdAt: Date;

  @ApiProperty({ type: 'string', format: 'date-time' })
  updatedAt: Date;

  @ApiProperty({ type: 'string', format: 'date-time', nullable: true })
  deletedAt: Date | null;
}
