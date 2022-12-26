import { Notification, Prisma } from '@prisma/client';

export abstract class NotificationRepository {
  abstract create(
    notification: Prisma.NotificationCreateInput,
  ): Promise<Notification>;
  abstract findById(notificationId: number): Promise<Notification | null>;
  abstract findMany(
    args?: Prisma.NotificationFindManyArgs,
  ): Promise<Array<Notification>>;
  abstract save(
    userId: number,
    data: Prisma.NotificationUpdateInput,
  ): Promise<void>;
  abstract findByUserId(userId: number): Promise<Array<Notification>>;
  abstract delete(id: number): Promise<void>;
}
