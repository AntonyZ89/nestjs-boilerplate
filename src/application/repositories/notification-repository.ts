import { Notification } from '@application/entities';

export abstract class NotificationRepository {
  abstract create(notification: Notification): Promise<Notification>;
  abstract findById(notificationId: number): Promise<Notification | null>;
  abstract findMany(): Promise<Array<Notification>>;
}
