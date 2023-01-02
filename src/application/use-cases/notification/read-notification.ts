import { NotificationRepository } from '@application/repositories';
import { Injectable } from '@nestjs/common';
import { NotificationNotFound } from '../errors';
import { Notification } from '@infra/database/typeorm/entities';

interface ReadNotificationRequest {
  notificationId: number;
}

interface ReadNotificationResponse {
  notification: Notification;
}

@Injectable()
export class ReadNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    request: ReadNotificationRequest,
  ): Promise<ReadNotificationResponse> {
    const notification = await this.notificationRepository.findById(
      request.notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.readAt = new Date();

    await this.notificationRepository.save(notification.id, notification);

    return { notification };
  }
}
