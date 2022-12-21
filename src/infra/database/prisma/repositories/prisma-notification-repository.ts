import { Notification } from '@application/entities';
import { NotificationRepository } from '@application/repositories';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private prismaService: PrismaService) {}

  private get prisma() {
    return this.prismaService.notification;
  }

  async create(notification: Notification): Promise<Notification> {
    const result = await this.prisma.create({
      data: notification.toJSON(),
    });

    notification.load(result);

    return notification;
  }

  async findById(notificationId: number): Promise<Notification | null> {
    const result = await this.prisma.findFirst({
      where: { id: notificationId },
    });

    return result ? new Notification(result) : null;
  }

  async findMany(
    args: Prisma.NotificationFindManyArgs,
  ): Promise<Notification[]> {
    const result = await this.prisma.findMany({
      orderBy: { createdAt: 'desc' },
      ...args,
    });

    return result.map((n) => new Notification(n));
  }

  async save(notification: Notification): Promise<void> {
    await this.prisma.update({
      where: { id: notification.id },
      data: notification.toJSON(),
    });
  }

  countByRecipientId(recipientId: string): Promise<number> {
    return this.prisma.count({ where: { recipientId } });
  }

  async findByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prisma.findMany({
      where: { recipientId },
      orderBy: { createdAt: 'desc' },
    });

    return notifications.map((n) => new Notification(n));
  }

  async delete(id: number): Promise<void> {
    await this.prisma.delete({ where: { id } });
  }
}
