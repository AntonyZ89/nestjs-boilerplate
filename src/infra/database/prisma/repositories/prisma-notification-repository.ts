import { Notification } from '@application/entities';
import { NotificationRepository } from '@application/repositories/notification-repository';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

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

  async findMany(): Promise<Notification[]> {
    const result = await this.prismaService.notification.findMany();

    return result.map((n) => new Notification(n));
  }
}
