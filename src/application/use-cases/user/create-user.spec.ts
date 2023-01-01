import { makeUser } from '@test/factories';
import {
  InMemoryNotificationRepository,
  InMemoryUserRepository,
} from '@test/repositories';
import * as bcrypt from 'bcrypt';
import { CreateUser } from './create-user';
import { User } from '@infra/database/typeorm/entities';
import { ValidationException } from '@infra/exceptions';

const USERNAME = 'my-username';
const PASSWORD = 'my-password';

const DUPLICATED_USERNAME = 'duplicated-username';

describe('Create user', () => {
  let userRepository: InMemoryUserRepository;
  let createUser: CreateUser;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository(
      new InMemoryNotificationRepository(),
    );
    createUser = new CreateUser(userRepository);
  });

  it('should be able to create a user', async () => {
    const user = makeUser({ username: USERNAME, password: PASSWORD });

    expect(createUser.execute(user)).resolves.toMatchObject({
      user: expect.any(User),
    });

    expect(user.username).toMatch(USERNAME);
    // validate if password was changed by bcrypt
    expect(user.password).not.toMatch(PASSWORD);
    // validate hash
    expect(bcrypt.compareSync(PASSWORD, user.password)).toEqual(true);
    expect(userRepository.users).toHaveLength(1);
  });

  it("should'nt be able to create a user with username that already exists", async () => {
    expect(
      createUser.execute(makeUser({ username: DUPLICATED_USERNAME })),
    ).resolves.not.toThrow();

    expect(
      createUser.execute(makeUser({ username: DUPLICATED_USERNAME })),
    ).rejects.toThrow(ValidationException);
  });
});
