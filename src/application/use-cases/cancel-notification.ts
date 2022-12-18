import { NotificationRepository } from '@application/repositories';
import { Injectable } from '@nestjs/common';
import { NotificationNotFound } from './errors';

interface CancelNotificationRequest {
  notificationId: number;
}

type CancelNotificationResponse = void;

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

    notification.cancel();

    await this.notificationRepository.save(notification);
  }
}
