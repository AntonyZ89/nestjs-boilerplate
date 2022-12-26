import { UserWithNotifications } from '@/types';
import { Prisma, User } from '@prisma/client';

export abstract class UserRepository {
  abstract create(user: Prisma.UserCreateInput): Promise<User>;
  abstract findById(userId: number): Promise<User | null>;
  abstract findByIdWithNotifications(
    userId: number,
  ): Promise<UserWithNotifications | null>;
  abstract findByUsername(name: string): Promise<User | null>;
  abstract findMany(args?: Prisma.UserFindManyArgs): Promise<Array<User>>;
  abstract save(userId: number, data: Prisma.UserUpdateInput): Promise<void>;
  abstract delete(userId: number): Promise<void>;
}
