import { ApiProperty } from '@nestjs/swagger';
import { PaginationDTO } from '../pagination-dto';
import { NotificationDTO } from './notification-dto';
import { Notification } from '@infra/database/typeorm/entities';

export class NotificationFromUserDTO extends PaginationDTO<Notification> {
  @ApiProperty({ type: NotificationDTO, isArray: true })
  items: Array<Notification>;
}
