import { Notification } from '@application/entities';
import { Prisma } from '@prisma/client';

export abstract class NotificationRepository {
  abstract create(notification: Notification): Promise<Notification>;
  abstract findById(notificationId: number): Promise<Notification | null>;
  abstract findMany(
    args?: Prisma.NotificationFindManyArgs,
  ): Promise<Array<Notification>>;
  abstract save(notification: Notification): Promise<void>;
  abstract countByRecipientId(recipientId: string): Promise<number>;
  abstract findByRecipientId(recipientId: string): Promise<Array<Notification>>;
  abstract delete(id: number): Promise<void>;
}
