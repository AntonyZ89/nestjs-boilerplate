import { NotificationRepository } from '@application/repositories';
import { Injectable } from '@nestjs/common';
import { NotificationNotFound } from '../errors';
import { Notification } from '@infra/database/typeorm/entities';

interface UnreadNotificationRequest {
  notificationId: number;
}

interface UnreadNotificationResponse {
  notification: Notification;
}

@Injectable()
export class UnreadNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    request: UnreadNotificationRequest,
  ): Promise<UnreadNotificationResponse> {
    const notification = await this.notificationRepository.findById(
      request.notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.readAt = null;

    await this.notificationRepository.save(notification.id, notification);

    return { notification };
  }
}
