import { User } from '@infra/database/typeorm/entities';

type ArgsType = Partial<Omit<User, 'id'>>;

export function makeUser(args: ArgsType = {}): User {
  return {
    username: 'Antony',
    password: '10203040',
    ...args,
  };
}
