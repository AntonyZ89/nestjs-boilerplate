import { NotificationRepository } from '@application/repositories';
import { Injectable } from '@nestjs/common';
import { NotificationNotFound } from '../errors';
import { Notification } from '@infra/database/typeorm/entities';

interface CancelNotificationRequest {
  notificationId: number;
}

interface CancelNotificationResponse {
  notification: Notification;
}

@Injectable()
export class CancelNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    request: CancelNotificationRequest,
  ): Promise<CancelNotificationResponse> {
    const notification = await this.notificationRepository.findById(
      request.notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.canceledAt = new Date();

    await this.notificationRepository.save(notification.id, notification);

    return { notification };
  }
}
