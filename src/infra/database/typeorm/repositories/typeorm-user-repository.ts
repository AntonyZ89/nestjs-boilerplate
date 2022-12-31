import { UserWithNotifications } from '@/types';
import { UserRepository } from '@application/repositories';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserCreateInput } from '../entities';
import { UserNotFound } from '@application/use-cases/errors';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    // TypeORM base repository
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(user: UserCreateInput): Promise<User> {
    const model = this.userRepository.create(user);

    return this.userRepository.save(model);
  }

  findById(userId: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id: userId });
  }

  findByIdWithNotifications(
    userId: number,
  ): Promise<UserWithNotifications | null> {
    const result = this.userRepository.findOne({
      where: { id: userId },
      relations: { notifications: true },
    });

    return result as Promise<UserWithNotifications | null>;
  }

  findByUsername(name: string): Promise<User | null> {
    return this.userRepository.findOneBy({ username: name });
  }

  findMany(): Promise<User[]> {
    return this.userRepository.find();
  }

  async save(userId: number, data: Partial<User>): Promise<void> {
    const user = await this.userRepository.findOneByOrFail({ id: userId });

    if (!user) throw new UserNotFound();

    user.load(data);

    await this.userRepository.update({ id: userId }, user);
  }

  async delete(userId: number): Promise<void> {
    await this.userRepository.softDelete(userId);
  }
}
