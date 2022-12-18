import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories';
import { CountRecipientNotification } from './count-recipient-notification';

const recipientId = 'test-recipient-id';

describe('Count notification by recipientId', () => {
  it('should be able to get notification count', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const countRecipientNotification = new CountRecipientNotification(
      notificationRepository,
    );

    notificationRepository.create(makeNotification({ recipientId }));
    notificationRepository.create(makeNotification({ recipientId }));
    notificationRepository.create(
      makeNotification({ recipientId: `${recipientId}-2` }),
    );

    const { count } = await countRecipientNotification.execute({ recipientId });

    expect(count).toEqual(2);
  });
});
