import { makeNotification, makeUser } from '@test/factories';
import {
  InMemoryNotificationRepository,
  InMemoryUserRepository,
} from '@test/repositories';
import { GetUserNotification } from './get-user-notification';

describe('Get notification by userId', () => {
  let notificationRepository: InMemoryNotificationRepository;
  let userRepository: InMemoryUserRepository;
  let getUserNotification: GetUserNotification;

  beforeAll(() => {
    notificationRepository = new InMemoryNotificationRepository();
    userRepository = new InMemoryUserRepository(notificationRepository);
    getUserNotification = new GetUserNotification(notificationRepository);
  });

  it('should be able to get notification list', async () => {
    const user = await userRepository.create(makeUser());
    const userId = user.id;

    notificationRepository.create(makeNotification({ userId }));
    notificationRepository.create(makeNotification({ userId }));
    notificationRepository.create(makeNotification({ userId: userId + 1 }));

    const { notifications } = await getUserNotification.execute({
      userId,
      page: 1,
      limit: 10,
    });

    expect(notifications.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ userId }),
        expect.objectContaining({ userId }),
      ]),
    );
  });

  it("should'nt be able to get notification list", async () => {
    const { notifications } = await getUserNotification.execute({
      userId: 999,
      page: 1,
      limit: 10,
    });

    expect(notifications.items).toHaveLength(0);
  });
});
