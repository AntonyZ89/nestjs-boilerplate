import { NotificationCreateInput } from '@infra/database/typeorm/entities';

type ArgsType = Partial<NotificationCreateInput> & {
  userId: number;
};

export function makeNotification(args: ArgsType): NotificationCreateInput {
  return {
    category: 'gift',
    content: 'you received a new gift',
    ...args,
  };
}
