import { makeNotification } from '@test/factories/notification-factory';
import {
  InMemoryNotificationRepository,
  InMemoryUserRepository,
} from '@test/repositories';
import { GetRecipientNotification } from './get-recipient-notification';
import { makeUser } from '@test/factories/user-factory';

const recipientId = 'test-recipient-id';

describe('Get notification by recipientId', () => {
  it('should be able to get notification list', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const userRepository = new InMemoryUserRepository();
    const countRecipientNotification = new GetRecipientNotification(
      notificationRepository,
    );

    const user = await userRepository.create(makeUser());
    const userId = user.id;

    notificationRepository.create(makeNotification({ userId, recipientId }));
    notificationRepository.create(makeNotification({ userId, recipientId }));
    notificationRepository.create(
      makeNotification({ userId, recipientId: `${recipientId}-2` }),
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
