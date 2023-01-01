import { makeNotification, makeUser } from '@test/factories';
import {
  InMemoryNotificationRepository,
  InMemoryUserRepository,
} from '@test/repositories';
import { NotificationNotFound } from '../errors';
import { UnreadNotification } from './unread-notification';

describe('Unread notification', () => {
  let notificationRepository = new InMemoryNotificationRepository();
  let userRepository = new InMemoryUserRepository(notificationRepository);
  let unreadNotification = new UnreadNotification(notificationRepository);

  beforeAll(() => {
    notificationRepository = new InMemoryNotificationRepository();
    userRepository = new InMemoryUserRepository(notificationRepository);
    unreadNotification = new UnreadNotification(notificationRepository);
  });

  it('should be able to unread a notification', async () => {
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
    expect(() =>
      unreadNotification.execute({ notificationId: 999 }),
    ).rejects.toThrow(NotificationNotFound);
  });
});
