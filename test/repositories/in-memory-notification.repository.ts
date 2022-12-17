import { Notification } from '@application/entities';
import { NotificationRepository } from '@application/repositories/notification-repository';

export class InMemoryNotificationRepository implements NotificationRepository {
  public notifications: Array<Notification> = [];

  async create(notification: Notification): Promise<Notification> {
    const length = this.notifications.push(notification);

    notification.id = length;

    return notification;
  }

  async findMany(): Promise<Notification[]> {
    return this.notifications;
  }

  async findById(notificationId: number): Promise<Notification | null> {
    const notification = this.notifications.find(
      (notification) => notification.id === notificationId,
    );

    return notification || null;
  }
}
