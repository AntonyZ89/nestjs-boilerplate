import { InMemoryNotificationRepository } from '@test/repositories';
import { SendNotification } from './send-notification';

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const sendNotification = new SendNotification(notificationRepository);

    const { notification } = await sendNotification.execute({
      content: 'This is a test',
      category: 'test',
      recipientId: 'test-recipient-id',
    });

    expect(notificationRepository.notifications).toHaveLength(1);
    expect(notificationRepository.notifications.at(0)).toEqual(notification);
    expect(notification.id).toEqual(1);
  });
});
