import { UserCreateInput } from '@infra/database/typeorm/entities';

type ArgsType = Partial<UserCreateInput>;

export function makeUser(args: ArgsType = {}): UserCreateInput {
  return {
    username: 'Antony',
    password: '10203040',
    ...args,
  };
}
