import { Notification, Prisma } from '@prisma/client';

type ArgsType = Partial<Omit<Notification, 'id' | 'userId'>> & {
  userId: number;
};

interface Result extends Prisma.NotificationCreateInput {
  user: {
    connect: { id: number };
  };
}

export function makeNotification(args: ArgsType): Result {
  return {
    category: 'gift',
    content: 'you received a new gift',
    ...args,
    user: {
      connect: { id: args.userId },
    },
  };
}
