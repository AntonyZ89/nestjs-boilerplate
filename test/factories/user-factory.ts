import { Prisma } from '@prisma/client';

type ArgsType = Partial<Prisma.UserCreateInput>;

export function makeUser(args: ArgsType = {}): Prisma.UserCreateInput {
  return {
    name: 'Antony',
    ...args,
  };
}
