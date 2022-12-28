import {
  Notification,
  NotificationCreateInput,
} from '@infra/database/typeorm/entities';

export abstract class NotificationRepository {
  abstract create(notification: NotificationCreateInput): Promise<Notification>;
  abstract findById(notificationId: number): Promise<Notification | null>;
  abstract findMany(): Promise<Array<Notification>>;
  abstract save(
    notificationId: number,
    data: Partial<Notification>,
  ): Promise<void>;
  abstract findByUserId(userId: number): Promise<Array<Notification>>;
  abstract delete(notificationId: number): Promise<void>;
}
