import { Notification } from '@application/entities';

export abstract class NotificationRepository {
  abstract create(notification: Notification): Promise<Notification>;
  abstract findById(notificationId: number): Promise<Notification | null>;
  abstract findMany(args?: any): Promise<Array<Notification>>;
  abstract save(notification: Notification): Promise<void>;
  abstract countByRecipientId(recipientId: string): Promise<number>;
  abstract byRecipientId(recipientId: string): Promise<Array<Notification>>;
}
