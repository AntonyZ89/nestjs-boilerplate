import { Notification } from '@application/entities';
import { NotificationRepository } from '@application/repositories/notification-repository';
import { Injectable } from '@nestjs/common';

interface SendNotificationRequest {
  recipientId: string;
  content: string;
  category: string;
}

interface SendNotificationResponse {
  notification: Notification;
}

@Injectable()
export class SendNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    request: SendNotificationRequest,
  ): Promise<SendNotificationResponse> {
    const notification = new Notification(request);

    await this.notificationRepository.create(notification);

    return {
      notification,
    };
  }
}
