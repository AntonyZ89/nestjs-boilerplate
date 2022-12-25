import { makeNotification } from '@test/factories/notification-factory';
import { makeUser } from '@test/factories/user-factory';
import {
  InMemoryNotificationRepository,
  InMemoryUserRepository,
} from '@test/repositories';
import { GetUserNotification } from './get-user-notification';

describe('Get notification by userId', () => {
  it('should be able to get notification list', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const userRepository = new InMemoryUserRepository(notificationRepository);
    const getUserNotification = new GetUserNotification(notificationRepository);

    const user = await userRepository.create(makeUser());
    const userId = user.id;

    notificationRepository.create(makeNotification({ userId }));
    notificationRepository.create(makeNotification({ userId }));
    notificationRepository.create(makeNotification({ userId: userId + 1 }));

    const { notifications } = await getUserNotification.execute({ userId });

    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ userId }),
        expect.objectContaining({ userId }),
      ]),
    );
  });
});
