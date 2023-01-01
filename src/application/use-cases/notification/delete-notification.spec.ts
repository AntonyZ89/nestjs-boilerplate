import {
  InMemoryNotificationRepository,
  InMemoryUserRepository,
} from '@test/repositories';
import { NotificationNotFound } from '../errors';
import { DeleteNotification } from './delete-notification';
import { makeNotification, makeUser } from '@test/factories';

describe('Delete notification', () => {
  let notificationRepository: InMemoryNotificationRepository;
  let userRepository: InMemoryUserRepository;
  let deleteNotification: DeleteNotification;

  beforeAll(() => {
    notificationRepository = new InMemoryNotificationRepository();
    userRepository = new InMemoryUserRepository(notificationRepository);
    deleteNotification = new DeleteNotification(notificationRepository);
  });

  it('should be able to delete a notification', async () => {
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
    expect(() =>
      deleteNotification.execute({ notificationId: 999 }),
    ).rejects.toThrow(NotificationNotFound);
  });
});
