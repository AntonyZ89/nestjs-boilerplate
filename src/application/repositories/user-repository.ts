import { UserWithNotifications } from '@/types';
import { User, UserCreateInput } from '@infra/database/typeorm/entities';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { FindManyOptions, FindOptionsWhere } from 'typeorm';

export abstract class UserRepository {
  abstract create(user: UserCreateInput): Promise<User>;
  abstract findById(userId: number): Promise<User | null>;
  abstract findByIdWithNotifications(
    userId: number,
  ): Promise<UserWithNotifications | null>;
  abstract findByUsername(name: string): Promise<User | null>;
  abstract findMany(): Promise<Array<User>>;
  abstract save(userId: number, data: Partial<User>): Promise<void>;
  abstract delete(userId: number): Promise<void>;
  abstract paginate(
    options: IPaginationOptions,
    searchOptions?: FindOptionsWhere<User> | FindManyOptions<User>,
  ): Promise<Pagination<User>>;
}
