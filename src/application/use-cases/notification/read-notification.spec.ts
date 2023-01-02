import { makeNotification, makeUser } from '@test/factories';
import {
  InMemoryNotificationRepository,
  InMemoryUserRepository,
} from '@test/repositories';
import { NotificationNotFound } from '../errors';
import { ReadNotification } from './read-notification';

describe('Read notification', () => {
  let notificationRepository: InMemoryNotificationRepository;
  let userRepository: InMemoryUserRepository;
  let readNotification: ReadNotification;

  beforeAll(() => {
    notificationRepository = new InMemoryNotificationRepository();
    userRepository = new InMemoryUserRepository(notificationRepository);
    readNotification = new ReadNotification(notificationRepository);
  });

  it('should be able to read a notification', async () => {
    const user = await userRepository.create(makeUser());
    const userId = user.id;

    const notification = await notificationRepository.create(
      makeNotification({ userId, readAt: new Date() }),
    );

    const { notification: n } = await readNotification.execute({
      notificationId: notification.id,
    });

    expect(n.readAt).toBeInstanceOf(Date);
  });

  it("should'nt be able to read a notification who not exists", () => {
    expect(() =>
      readNotification.execute({ notificationId: 999 }),
    ).rejects.toThrow(NotificationNotFound);
  });
});
