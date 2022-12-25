import { NotificationRepository } from '@application/repositories/notification-repository';
import { Injectable } from '@nestjs/common';
import { Notification } from '@prisma/client';

interface SendNotificationRequest {
  recipientId: string;
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
    const { userId, ...rest } = request;

    const notification = await this.notificationRepository.create({
      ...rest,
      user: {
        connect: { id: userId },
      },
    });

    return {
      notification,
    };
  }
}
