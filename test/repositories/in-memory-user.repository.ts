import { UserWithNotifications } from '@/types';
import {
  NotificationRepository,
  UserRepository,
} from '@application/repositories';
import { UserNotFound } from '@application/use-cases/errors';
import { User, UserCreateInput } from '@infra/database/typeorm/entities';
import { ValidationException } from '@infra/exceptions';
import { makePagination } from '@test/factories';
import { isEmpty } from 'class-validator';
import {
  IPaginationMeta,
  IPaginationOptions,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { FindManyOptions, FindOptionsWhere } from 'typeorm';

export class InMemoryUserRepository implements UserRepository {
  constructor(private notificationRepository: NotificationRepository) {}

  public users: Array<User> = [];

  async create(user: UserCreateInput): Promise<User> {
    const payload = new User({
      id: this.users.length + 1,
      notifications: [],
      ...user,
      createdAt: this.#handleDate(user.createdAt || new Date()) as Date,
      updatedAt: this.#handleDate(user.updatedAt || new Date()) as Date,
      deletedAt: this.#handleDate(user.deletedAt),
    });

    // validate data, if validation fails, throw an error
    this.#validateUser({ data: payload });

    this.users.unshift(payload);

    return payload;
  }

  async findMany(): Promise<User[]> {
    return this.users;
  }

  async findById(UserId: number): Promise<User | null> {
    const user = this.users.find((user) => user.id === UserId);

    return user || null;
  }

  async findByIdWithNotifications(
    userId: number,
  ): Promise<UserWithNotifications | null> {
    const user = this.users.find((user) => user.id === userId);

    if (!user) {
      return null;
    }

    return Object.assign(user, {
      notifications: await this.notificationRepository.findByUserId(user.id),
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = this.users.find((user) => user.username === username);

    return user || null;
  }

  async save(userId: number, data: Partial<User>): Promise<void> {
    const index = this.users.findIndex((user) => user.id === userId);

    if (index === -1) throw new UserNotFound();

    const oldData = this.users[index];
    const newData = Object.assign(oldData, data);

    // validate new data, if validation fails, throw an error
    this.#validateUser({ userId, data: newData });

    this.users[index] = newData;
  }

  async delete(userId: number): Promise<void> {
    const index = this.users.findIndex((user) => user.id === userId);

    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }

  async paginate(
    options: IPaginationOptions<IPaginationMeta>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    searchOptions?: FindOptionsWhere<User> | FindManyOptions<User>,
  ): Promise<Pagination<User>> {
    const items = await this.findMany();

    return makePagination(items, options);
  }

  /*
   * Utils
   */

  #handleDate(date: Date | string | undefined | null): Date | null {
    if (date instanceof Date) return date;

    if (typeof date === 'string') return new Date(date);

    return null;
  }

  /**
   * Validates the user data before saving it to the database.
   *
   * Only validations presents in User Entity
   * @see User
   */
  #validateUser({ userId, data }: { userId?: number; data: User }) {
    // required username
    if (isEmpty(data.username)) {
      throw new ValidationException({
        errors: { username: 'Username is required' },
      });
    }

    // required password
    if (isEmpty(data.password)) {
      throw new ValidationException({
        errors: { password: 'Password is required' },
      });
    }

    // duplicated username
    const duplicatedUsername = this.users.find((dbUser) => {
      let condition = dbUser.username === data.username;

      // exclude user if it is the same as the current user
      if (userId) {
        condition &&= dbUser.id !== userId;
      }

      return condition;
    });

    if (duplicatedUsername) {
      throw new ValidationException({
        errors: { username: 'Username already exists' },
      });
    }
  }
}
