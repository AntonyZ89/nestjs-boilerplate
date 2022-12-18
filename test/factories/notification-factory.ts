import {
  NotificationConstructorProps,
  Notification,
} from '@application/entities';

type ArgsType = Partial<NotificationConstructorProps>;

export function makeNotification(args: ArgsType = {}): Notification {
  return new Notification({
    category: 'gift',
    content: 'you received a new gift',
    recipientId: 'factory-recipient-id',
    ...args,
  });
}
