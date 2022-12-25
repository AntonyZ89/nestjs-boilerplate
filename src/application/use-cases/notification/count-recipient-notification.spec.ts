import { makeNotification } from '@test/factories/notification-factory';
import {
  InMemoryNotificationRepository,
  InMemoryUserRepository,
} from '@test/repositories';
import { CountRecipientNotification } from './count-recipient-notification';
import { makeUser } from '@test/factories/user-factory';

const recipientId = 'test-recipient-id';

describe('Count notification by recipientId', () => {
  it('should be able to get notification count', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const userRepository = new InMemoryUserRepository();
    const countRecipientNotification = new CountRecipientNotification(
      notificationRepository,
    );

    const user = await userRepository.create(makeUser());
    const userId = user.id;

    notificationRepository.create(makeNotification({ userId, recipientId }));
    notificationRepository.create(makeNotification({ userId, recipientId }));
    notificationRepository.create(
      makeNotification({ userId, recipientId: `${recipientId}-2` }),
    );

    const { count } = await countRecipientNotification.execute({ recipientId });

    expect(count).toEqual(2);
  });
});
