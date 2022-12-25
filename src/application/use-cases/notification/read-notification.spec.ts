import {
  InMemoryNotificationRepository,
  InMemoryUserRepository,
} from '@test/repositories';
import { ReadNotification } from './read-notification';
import { makeNotification } from '@test/factories/notification-factory';
import { NotificationNotFound } from '../errors';
import { makeUser } from '@test/factories/user-factory';

describe('Read notification', () => {
  it('should be able to read a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const userRepository = new InMemoryUserRepository(notificationRepository);
    const readNotification = new ReadNotification(notificationRepository);

    const user = await userRepository.create(makeUser());
    const userId = user.id;

    const notification = await notificationRepository.create(
      makeNotification({ userId, readAt: new Date() }),
    );

    await readNotification.execute({ notificationId: notification.id });

    expect(notificationRepository.notifications[0].readAt).toBeInstanceOf(Date);
  });

  it("should'nt be able to read a notification who not exists", () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const readNotification = new ReadNotification(notificationRepository);

    expect(() =>
      readNotification.execute({ notificationId: 999 }),
    ).rejects.toThrow(NotificationNotFound);
  });
});
