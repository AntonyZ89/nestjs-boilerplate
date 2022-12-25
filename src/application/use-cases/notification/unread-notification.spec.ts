import { makeNotification } from '@test/factories/notification-factory';
import {
  InMemoryNotificationRepository,
  InMemoryUserRepository,
} from '@test/repositories';
import { NotificationNotFound } from '../errors';
import { UnreadNotification } from './unread-notification';
import { makeUser } from '@test/factories/user-factory';

describe('Unread notification', () => {
  it('should be able to unread a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const userRepository = new InMemoryUserRepository();
    const unreadNotification = new UnreadNotification(notificationRepository);

    const user = await userRepository.create(makeUser());
    const userId = user.id;

    const notification = await notificationRepository.create(
      makeNotification({ userId, readAt: new Date() }),
    );

    expect(notificationRepository.notifications[0].readAt).toBeInstanceOf(Date);

    await unreadNotification.execute({ notificationId: notification.id });

    expect(notificationRepository.notifications[0].readAt).toBeNull();
  });

  it("should'nt be able to unread a notification who not exists", () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const unreadNotification = new UnreadNotification(notificationRepository);

    expect(() =>
      unreadNotification.execute({ notificationId: 999 }),
    ).rejects.toThrow(NotificationNotFound);
  });
});
