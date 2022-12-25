import { UserWithNotifications } from '@/types';
import {
  NotificationRepository,
  UserRepository,
} from '@application/repositories';
import { UserNotFound } from '@application/use-cases/errors';
import { Prisma, User } from '@prisma/client';

export class InMemoryUserRepository implements UserRepository {
  constructor(private notificationRepository: NotificationRepository) {}

  public users: Array<User> = [];

  async create(user: Prisma.UserCreateInput): Promise<User> {
    const payload: User = {
      id: this.users.length + 1,
      ...user,
      createdAt: this.#handleDate(user.createdAt) as Date,
      deletedAt: this.#handleDate(user.deletedAt),
    };

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

  async findByName(name: string): Promise<User | null> {
    const user = this.users.find((user) => user.name === name);

    return user || null;
  }

  async save(userId: number, data: Partial<User>): Promise<void> {
    const index = this.users.findIndex((user) => user.id === userId);

    if (index !== -1) {
      const oldData = this.users[index];

      this.users[index] = Object.assign(oldData, data);
    } else {
      throw new UserNotFound();
    }
  }

  async delete(userId: number): Promise<void> {
    const index = this.users.findIndex((user) => user.id === userId);

    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }

  /*
   * Utils
   */

  #handleDate(date: Date | string | undefined | null): Date | null {
    if (date instanceof Date) return date;

    if (typeof date === 'string') return new Date(date);

    return null;
  }
}
