import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories';
import { NotificationNotFound } from './errors';
import { DeleteNotification } from './delete-notification';

describe('Delete notification', () => {
  it('should be able to delete a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const deleteNotification = new DeleteNotification(notificationRepository);

    const notification = makeNotification();

    await notificationRepository.create(notification);

    expect(notificationRepository.notifications).toHaveLength(1);

    await deleteNotification.execute({ notificationId: notification.id });

    expect(notificationRepository.notifications).toHaveLength(0);
  });

  it("should'nt be able to delete a notification who not exists", () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const deleteNotification = new DeleteNotification(notificationRepository);

    expect(() =>
      deleteNotification.execute({ notificationId: 999 }),
    ).rejects.toThrow(NotificationNotFound);
  });
});
