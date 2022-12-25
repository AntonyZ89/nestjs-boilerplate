import { NotificationRepository } from '@application/repositories';
import { Injectable } from '@nestjs/common';
import { NotificationNotFound } from '../errors';

interface ReadNotificationRequest {
  notificationId: number;
}

type ReadNotificationResponse = void;

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
  }
}
