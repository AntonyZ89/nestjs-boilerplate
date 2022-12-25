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

  async create(
    notification: Prisma.NotificationCreateInput,
  ): Promise<Notification> {
    return this.prisma.create({
      data: notification,
    });
  }

  async findById(notificationId: number): Promise<Notification | null> {
    return this.prisma.findFirst({
      where: { id: notificationId },
    });
  }

  async findMany(
    args: Prisma.NotificationFindManyArgs,
  ): Promise<Notification[]> {
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

  countByRecipientId(recipientId: string): Promise<number> {
    return this.prisma.count({ where: { recipientId } });
  }

  async findByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.prisma.findMany({
      where: { recipientId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.delete({ where: { id } });
  }
}
