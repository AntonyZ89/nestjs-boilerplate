import { makeUser } from '@test/factories';
import { makeNotification } from '@test/factories/notification-factory';
import {
  InMemoryNotificationRepository,
  InMemoryUserRepository,
} from '@test/repositories';
import { NotificationNotFound } from '../errors';
import { CancelNotification } from './cancel-notification';
import { Notification } from '@infra/database/typeorm/entities';

describe('Cancel notification', () => {
  let notificationRepository: InMemoryNotificationRepository;
  let userRepository: InMemoryUserRepository;
  let cancelNotification: CancelNotification;

  beforeAll(() => {
    notificationRepository = new InMemoryNotificationRepository();
    userRepository = new InMemoryUserRepository(notificationRepository);
    cancelNotification = new CancelNotification(notificationRepository);
  });

  it('should be able to cancel a notification', async () => {
    const user = await userRepository.create(makeUser());
    const userId = user.id;

    const notification = await notificationRepository.create(
      makeNotification({ userId, readAt: new Date() }),
    );

    const { notification: n } = await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(n).toBeInstanceOf(Notification);
    expect(n.id).toEqual(notification.id);
    expect(n.canceledAt).toBeInstanceOf(Date);
  });

  it("should'nt be able to cancel a notification who not exists", () => {
    expect(cancelNotification.execute({ notificationId: 999 })).rejects.toThrow(
      NotificationNotFound,
    );
  });
});
