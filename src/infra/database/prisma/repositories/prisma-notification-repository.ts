import { Notification } from '@application/entities';
import { NotificationRepository } from '@application/repositories';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private prismaService: PrismaService) {}

  async create(notification: Notification): Promise<Notification> {
    const result = await this.prismaService.notification.create({
      data: notification.toJSON(),
    });

    notification.load(result);

    return notification;
  }

  async findById(notificationId: number): Promise<Notification | null> {
    const result = await this.prismaService.notification.findFirst({
      where: { id: notificationId },
    });

    if (result) {
      return new Notification(result);
    }

    return null;
  }

  async findMany(
    args: Prisma.NotificationFindManyArgs,
  ): Promise<Notification[]> {
    const result = await this.prismaService.notification.findMany(args);

    return result.map((n) => new Notification(n));
  }
}
