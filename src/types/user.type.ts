import { Notification, User } from '@infra/database/typeorm/entities';

export interface UserWithNotifications extends User {
  notifications: Array<Notification>;
}
