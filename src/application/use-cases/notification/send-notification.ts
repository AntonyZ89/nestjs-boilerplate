import { NotificationRepository } from '@application/repositories';
import { Notification } from '@infra/database/typeorm/entities';
import { Injectable } from '@nestjs/common';

interface SendNotificationRequest {
  userId: number;
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
    const notification = await this.notificationRepository.create(request);

    return {
      notification,
    };
  }
}
