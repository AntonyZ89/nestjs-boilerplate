import { makeUser } from '@test/factories';
import {
  InMemoryNotificationRepository,
  InMemoryUserRepository,
} from '@test/repositories';
import { SendNotification } from './send-notification';

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const userRepository = new InMemoryUserRepository(notificationRepository);
    const sendNotification = new SendNotification(notificationRepository);

    const user = await userRepository.create(makeUser());
    const userId = user.id;

    const { notification } = await sendNotification.execute({
      userId,
      content: 'This is a test',
      category: 'test',
    });

    expect(notificationRepository.notifications).toHaveLength(1);
    expect(notificationRepository.notifications.at(0)).toEqual(notification);
    expect(notification.id).toEqual(1);
  });
});
