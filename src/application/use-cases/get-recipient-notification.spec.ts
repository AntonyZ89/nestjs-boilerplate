import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories';
import { GetRecipientNotification } from './get-recipient-notification';

const recipientId = 'test-recipient-id';

describe('Get notification by recipientId', () => {
  it('should be able to get notification list', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const countRecipientNotification = new GetRecipientNotification(
      notificationRepository,
    );

    notificationRepository.create(makeNotification({ recipientId }));
    notificationRepository.create(makeNotification({ recipientId }));
    notificationRepository.create(
      makeNotification({ recipientId: `${recipientId}-2` }),
    );

    const { notifications } = await countRecipientNotification.execute({
      recipientId,
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId }),
        expect.objectContaining({ recipientId }),
      ]),
    );
  });
});
