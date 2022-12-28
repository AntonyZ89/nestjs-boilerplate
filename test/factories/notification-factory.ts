import { Notification } from '@infra/database/typeorm/entities';

type ArgsType = Partial<Omit<Notification, 'id' | 'userId'>> & {
  userId: number;
};

export function makeNotification(args: ArgsType): Notification {
  return {
    category: 'gift',
    content: 'you received a new gift',
    ...args,
  };
}
