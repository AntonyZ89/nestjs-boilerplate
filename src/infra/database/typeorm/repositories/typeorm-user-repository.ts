import { UserWithNotifications } from '@/types';
import { UserRepository } from '@application/repositories';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { User, UserCreateInput } from '../entities';
import { UserNotFound } from '@application/use-cases/errors';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  create(user: UserCreateInput): Promise<User> {
    const model = this.repository.create(user);

    return this.repository.save(model);
  }

  findById(userId: number): Promise<User | null> {
    return this.repository.findOneBy({ id: userId });
  }

  findByIdWithNotifications(
    userId: number,
  ): Promise<UserWithNotifications | null> {
    const result = this.repository.findOne({
      where: { id: userId },
      relations: { notifications: true },
    });

    return result as Promise<UserWithNotifications | null>;
  }

  findByUsername(name: string): Promise<User | null> {
    return this.repository.findOneBy({ username: name });
  }

  findMany(): Promise<User[]> {
    return this.repository.find();
  }

  async save(userId: number, data: Partial<User>): Promise<void> {
    const user = await this.repository.findOneBy({ id: userId });

    if (!user) throw new UserNotFound();

    user.load(data);

    await this.repository.update({ id: userId }, user);
  }

  async delete(userId: number): Promise<void> {
    await this.repository.softDelete(userId);
  }

  async paginate(
    options: IPaginationOptions,
    searchOptions?: FindOptionsWhere<User> | FindManyOptions<User>,
  ): Promise<Pagination<User>> {
    return paginate<User>(this.repository, options, {
      order: { id: 'DESC' },
      ...searchOptions,
    });
  }
}
