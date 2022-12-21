import { Notification } from '@application/entities';
import { NotificationRepository } from '@application/repositories';
import { NotificationNotFound } from '@application/use-cases';

export class InMemoryNotificationRepository implements NotificationRepository {
  public notifications: Array<Notification> = [];

  async create(notification: Notification): Promise<Notification> {
    const length = this.notifications.unshift(notification);

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

  async save(notification: Notification): Promise<void> {
    const index = this.notifications.findIndex((n) => n.id === notification.id);

    if (index !== -1) {
      this.notifications[index] = notification;
    } else {
      throw new NotificationNotFound();
    }
  }

  async countByRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    ).length;
  }

  async findByRecipientId(recipientId: string): Promise<Array<Notification>> {
    return this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    );
  }

  async delete(id: number): Promise<void> {
    const index = this.notifications.findIndex((n) => n.id === id);

    if (index !== -1) {
      this.notifications.splice(index, 1);
    }
  }
}
