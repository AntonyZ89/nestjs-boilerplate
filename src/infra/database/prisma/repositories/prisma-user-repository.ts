import { UserWithNotifications } from '@/types';
import { UserRepository } from '@application/repositories';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prismaService: PrismaService) {}

  private get prisma() {
    return this.prismaService.user;
  }

  create(user: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.create({ data: user });
  }

  findById(userId: number): Promise<User | null> {
    return this.prisma.findFirst({ where: { id: userId } });
  }

  findByIdWithNotifications(
    userId: number,
  ): Promise<UserWithNotifications | null> {
    return this.prisma.findFirst({
      where: { id: userId },
      include: { notifications: true },
    });
  }

  findByName(name: string): Promise<User | null> {
    return this.prisma.findFirst({ where: { name } });
  }

  findMany(args?: Prisma.UserFindManyArgs): Promise<Array<User>> {
    return this.prisma.findMany({
      orderBy: { createdAt: 'desc' },
      ...args,
    });
  }

  async save(userId: number, data: Prisma.UserUpdateInput): Promise<void> {
    await this.prisma.update({
      where: { id: userId },
      data,
    });
  }

  async delete(userId: number): Promise<void> {
    await this.prisma.delete({ where: { id: userId } });
  }
}
