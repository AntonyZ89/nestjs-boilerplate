import { UserWithNotifications } from '@/types';

export abstract class UserRepository<T = any> {
  abstract create(user: any): Promise<T>;
  abstract findById(userId: number): Promise<T | null>;
  abstract findByIdWithNotifications(
    userId: number,
  ): Promise<UserWithNotifications | null>;
  abstract findByUsername(name: string): Promise<T | null>;
  abstract findMany(): Promise<Array<T>>;
  abstract save(userId: number, data: any): Promise<void>;
  abstract delete(userId: number): Promise<void>;
}
