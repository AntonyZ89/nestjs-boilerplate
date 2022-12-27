import { makeUser } from '@test/factories/user-factory';
import { CreateUser } from './create-user';
import {
  InMemoryNotificationRepository,
  InMemoryUserRepository,
} from '@test/repositories';

describe('Create user', () => {
  it('should be able to create a user', async () => {
    const userRepository = new InMemoryUserRepository(
      new InMemoryNotificationRepository(),
    );
    const createUser = new CreateUser(userRepository);

    expect(async () => {
      await createUser.execute(makeUser());
    }).not.toThrow();

    expect(userRepository.users).toHaveLength(1);
  });
});
