import { Notification, User } from '@prisma/client';

export interface UserWithNotifications extends User {
  notifications: Array<Notification>;
}
