import {
  InMemoryNotificationRepository,
  InMemoryUserRepository,
} from '@test/repositories';
import { SendNotification } from './send-notification';
import { makeUser } from '@test/factories/user-factory';

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const userRepository = new InMemoryUserRepository();
    const sendNotification = new SendNotification(notificationRepository);

    const user = await userRepository.create(makeUser());
    const userId = user.id;

    const { notification } = await sendNotification.execute({
      userId,
      content: 'This is a test',
      category: 'test',
      recipientId: 'test-recipient-id',
    });

    expect(notificationRepository.notifications).toHaveLength(1);
    expect(notificationRepository.notifications.at(0)).toEqual(notification);
    expect(notification.id).toEqual(1);
  });
});
