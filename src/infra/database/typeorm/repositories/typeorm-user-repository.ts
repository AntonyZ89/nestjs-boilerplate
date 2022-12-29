import { UserWithNotifications } from '@/types';
import { UserRepository } from '@application/repositories';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserCreateInput } from '../entities';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    // TypeORM base repository
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(user: UserCreateInput): Promise<User> {
    return this.userRepository.save(user);
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
    await this.userRepository.update({ id: userId }, data);
  }

  async delete(userId: number): Promise<void> {
    await this.userRepository.softDelete(userId);
  }
}
