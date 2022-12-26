import { Prisma } from '@prisma/client';

type ArgsType = Partial<Prisma.UserCreateInput>;

export function makeUser(args: ArgsType = {}): Prisma.UserCreateInput {
  return {
    username: 'Antony',
    password: '10203040',
    ...args,
  };
}
