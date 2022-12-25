import { makeNotification } from '@test/factories/notification-factory';
import {
  InMemoryNotificationRepository,
  InMemoryUserRepository,
} from '@test/repositories';
import { NotificationNotFound } from '../errors';
import { DeleteNotification } from './delete-notification';
import { makeUser } from '@test/factories/user-factory';

describe('Delete notification', () => {
  it('should be able to delete a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const userRepository = new InMemoryUserRepository();
    const deleteNotification = new DeleteNotification(notificationRepository);

    const user = await userRepository.create(makeUser());
    const userId = user.id;

    const notification = await notificationRepository.create(
      makeNotification({ userId, readAt: new Date() }),
    );

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
