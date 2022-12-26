import { NotificationRepository } from '@application/repositories';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Notification, Prisma } from '@prisma/client';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private prismaService: PrismaService) {}

  private get prisma() {
    return this.prismaService.notification;
  }

  create(notification: Prisma.NotificationCreateInput): Promise<Notification> {
    return this.prisma.create({
      data: notification,
    });
  }

  findById(notificationId: number): Promise<Notification | null> {
    return this.prisma.findFirst({
      where: { id: notificationId },
    });
  }

  findMany(args: Prisma.NotificationFindManyArgs): Promise<Notification[]> {
    return this.prisma.findMany({
      orderBy: { createdAt: 'desc' },
      ...args,
    });
  }

  async save(
    notificationId: number,
    data: Prisma.NotificationUpdateInput,
  ): Promise<void> {
    await this.prisma.update({
      where: { id: notificationId },
      data,
    });
  }

  findByUserId(userId: number): Promise<Array<Notification>> {
    return this.prisma.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.delete({ where: { id } });
  }
}
