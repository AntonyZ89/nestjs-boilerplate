import { makeNotification } from '@test/factories/notification-factory';
import {
  InMemoryNotificationRepository,
  InMemoryUserRepository,
} from '@test/repositories';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from '../errors';
import { makeUser } from '@test/factories/user-factory';

describe('Cancel notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const userRepository = new InMemoryUserRepository(notificationRepository);
    const cancelNotification = new CancelNotification(notificationRepository);

    const user = await userRepository.create(makeUser());
    const userId = user.id;

    const notification = await notificationRepository.create(
      makeNotification({ userId, readAt: new Date() }),
    );

    await cancelNotification.execute({ notificationId: notification.id });

    expect(notificationRepository.notifications[0].canceledAt).toBeInstanceOf(
      Date,
    );
  });

  it("should'nt be able to cancel a notification who not exists", () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    expect(() =>
      cancelNotification.execute({ notificationId: 999 }),
    ).rejects.toThrow(NotificationNotFound);
  });
});
