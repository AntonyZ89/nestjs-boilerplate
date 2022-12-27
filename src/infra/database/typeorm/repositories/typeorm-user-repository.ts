import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities';
import { UserRepository } from '@application/repositories';
import { UserWithNotifications } from '@/types';

@Injectable()
export class TypeOrmUserRepository implements UserRepository<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  findById(userId: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id: userId });
  }

  findByIdWithNotifications(
    userId: number,
  ): Promise<UserWithNotifications | null> {
    throw new Error('Method not implemented.');
  }

  findByUsername(name: string): Promise<User | null> {
    return this.userRepository.findOneBy({ username: name });
  }

  findMany(): Promise<User[]> {
    return this.userRepository.find();
  }

  async save(userId: number, data: any): Promise<void> {
    await this.userRepository.update({ id: userId }, data);
  }

  async delete(userId: number): Promise<void> {
    await this.userRepository.softDelete(userId);
  }
}
