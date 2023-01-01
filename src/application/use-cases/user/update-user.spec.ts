import { makeUser } from '@test/factories';
import {
  InMemoryNotificationRepository,
  InMemoryUserRepository,
} from '@test/repositories';
import * as bcrypt from 'bcrypt';
import { UpdateUser } from './update-user';
import { User } from '@infra/database/typeorm/entities';
import { ValidationException } from '@infra/exceptions';
import { UserNotFound } from '../errors';

const NEW_PASSWORD = 'new-password';
const NEW_USERNAME = 'new-username';

const DUPLICATED_USERNAME = 'duplicated-username';

describe('Update user', () => {
  let userRepository: InMemoryUserRepository;
  let updateUser: UpdateUser;
  let userPassword: User;

  beforeAll(async () => {
    // init variables
    const notificationRepository = new InMemoryNotificationRepository();
    userRepository = new InMemoryUserRepository(notificationRepository);

    updateUser = new UpdateUser(userRepository);

    // create users
    userPassword = await userRepository.create(
      makeUser({ password: 'random-password' }),
    );
    userRepository.create(
      makeUser({ username: DUPLICATED_USERNAME, password: NEW_PASSWORD }),
    );
  });

  it('should be able to update password', async () => {
    expect(
      updateUser.execute({
        userId: userPassword.id,
        data: { password: NEW_PASSWORD },
      }),
    ).resolves.not.toThrow();

    const user = (await userRepository.findById(userPassword.id))!;

    // validate if password was changed
    expect(user.password).not.toMatch(NEW_PASSWORD);
    // validate hash
    expect(bcrypt.compareSync(NEW_PASSWORD, user.password)).toEqual(true);
  });

  it('should be able to update username', async () => {
    const user = (await userRepository.findById(userPassword.id))!;

    expect(
      updateUser.execute({
        userId: user.id,
        data: { username: NEW_USERNAME },
      }),
    ).resolves.not.toThrow();

    expect(user.username).toEqual(NEW_USERNAME);
  });

  it("should'nt able to update username if username already exists", async () => {
    const user = await userRepository.create(
      makeUser({ username: 'random-username' }),
    );

    expect(
      updateUser.execute({
        userId: user.id,
        data: { username: DUPLICATED_USERNAME },
      }),
    ).rejects.toThrow(ValidationException);
  });

  it("should'nt be able to update username if user doesn't exist", async () => {
    expect(
      updateUser.execute({
        userId: 999,
        data: { username: NEW_USERNAME },
      }),
    ).rejects.toThrow(UserNotFound);
  });
});
