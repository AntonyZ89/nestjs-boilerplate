import { NotificationRepository } from '@application/repositories';
import { NotificationNotFound } from '@application/use-cases/errors';
import {
  Notification,
  NotificationCreateInput,
} from '@infra/database/typeorm/entities';

export class InMemoryNotificationRepository implements NotificationRepository {
  public notifications: Array<Notification> = [];

  async create(notification: NotificationCreateInput): Promise<Notification> {
    const payload = {
      id: this.notifications.length + 1,
      ...notification,
      readAt: this.#handleDate(notification.readAt),
      canceledAt: this.#handleDate(notification.canceledAt),
      createdAt: this.#handleDate(notification.createdAt || new Date()) as Date,
      updatedAt: this.#handleDate(notification.updatedAt || new Date()) as Date,
      deletedAt: this.#handleDate(notification.deletedAt),
    };

    this.notifications.unshift(payload);

    return payload;
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

  async save(
    notificationId: number,
    data: Partial<Notification>,
  ): Promise<void> {
    const index = this.notifications.findIndex((n) => n.id === notificationId);

    if (index !== -1) {
      const oldData = this.notifications[index];

      this.notifications[index] = Object.assign(oldData, data);
    } else {
      throw new NotificationNotFound();
    }
  }

  async findByUserId(userId: number): Promise<Notification[]> {
    return this.notifications.filter(
      (notification) => notification.userId === userId,
    );
  }

  async delete(id: number): Promise<void> {
    const index = this.notifications.findIndex((n) => n.id === id);

    if (index !== -1) {
      this.notifications.splice(index, 1);
    }
  }

  /*
   * Utils
   */

  #handleDate(date: Date | string | undefined | null): Date | null {
    if (date instanceof Date) return date;

    if (typeof date === 'string') return new Date(date);

    return null;
  }
}
