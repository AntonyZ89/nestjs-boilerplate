import { Notification } from '@application/entities';
import { InMemoryNotificationRepository } from '@test/repositories';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors';
import { makeNotification } from '@test/factories/notification-factory';

describe('Cancel notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const sendNotification = new CancelNotification(notificationRepository);

    const notification = await notificationRepository.create(
      makeNotification(),
    );

    await sendNotification.execute({ notificationId: notification.id });

    const dbNotification = await notificationRepository.findById(
      notification.id,
    );

    expect(dbNotification).toBeInstanceOf(Notification);

    if (dbNotification) {
      expect(dbNotification.canceledAt).toBeInstanceOf(Date);
    }
  });

  it("should'nt be able to cancel a notification who not exists", () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    expect(() =>
      cancelNotification.execute({ notificationId: 999 }),
    ).rejects.toThrow(NotificationNotFound);
  });
});
